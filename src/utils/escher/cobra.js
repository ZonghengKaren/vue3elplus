import {
  glp_create_prob, glp_set_prob_name, glp_set_obj_dir, glp_add_rows,
  glp_add_cols, glp_set_row_name, glp_set_row_bnds, glp_set_col_name,
  glp_set_col_bnds, glp_set_obj_coef, glp_load_matrix, glp_simplex,
  glp_get_obj_val, glp_get_num_cols, glp_get_col_name, glp_get_col_prim,
  SMCP, GLP_MAX, GLP_FX, GLP_DB, GLP_ON
} from 'glpk.js'

export class Model {
  // constructor (data) {
  //   this.reactions = data.reactions.map(x => ({...x}))
  //   this.metabolites = data.metabolites.map(x => ({...x}))
  //   this.genes = data.genes.map(x => ({...x}))
  //   this.id = data.id
  //   this.notes = data.notes // TODO is this an object? if so clone
  //   this.description = data.description
  // }

  buildGlpkProblem () {
    /** Build a GLPK LP for the model */

    const nRows = this.metabolites.length
    const nCols = this.reactions.length
    const ia = []
    const ja = []
    const ar = []
    const metLookup = {}

    // initialize LP objective
    var lp = glp_create_prob()
    glp_set_prob_name(lp, 'knockout FBA')
    // maximize
    glp_set_obj_dir(lp, GLP_MAX)
    // set up rows and columns
    glp_add_rows(lp, nRows)
    glp_add_cols(lp, nCols)

    // metabolites
    this.metabolites.forEach(function (metabolite, i) {
      var rowInd = i + 1
      glp_set_row_name(lp, rowInd, metabolite.id)
      glp_set_row_bnds(lp, rowInd, GLP_FX, 0.0, 0.0)
      // remember the indices of the metabolites
      metLookup[metabolite.id] = rowInd
    })

    // reactions
    var matInd = 1
    this.reactions.forEach(function (reaction, i) {
      var colInd = i + 1

      glp_set_col_name(lp, colInd, reaction.id)
      if (reaction.lower_bound === reaction.upper_bound) {
        glp_set_col_bnds(lp, colInd, GLP_FX, reaction.lower_bound, reaction.upper_bound)
      } else {
        glp_set_col_bnds(lp, colInd, GLP_DB, reaction.lower_bound, reaction.upper_bound)
      }

      // object_coefficient is optional for reaction in COBRA JSON
      if ('objective_coefficient' in reaction) {
        glp_set_obj_coef(lp, colInd, reaction.objective_coefficient)
      }

      // S matrix values
      for (var metId in reaction.metabolites) {
        ia[matInd] = metLookup[metId]
        ja[matInd] = colInd
        ar[matInd] = reaction.metabolites[metId]
        matInd++
      }
    })
    // Load the S matrix
    glp_load_matrix(lp, ia.length - 1, ia, ja, ar)

    return lp
  }

  optimize () {
    const problem = this.buildGlpkProblem()
    var smcp = new SMCP({ presolve: GLP_ON })
    const returnCode = glp_simplex(problem, smcp)
    var f = null
    var x = null
    if (returnCode === 0) {
      // get the objective
      f = glp_get_obj_val(problem)
      // get the primal
      x = {}
      for (var i = 1; i <= glp_get_num_cols(problem); i++) {
        x[glp_get_col_name(problem, i)] = glp_get_col_prim(problem, i)
      }
    } else {
      console.error('Invalid Solution')
    }

    return new Solution(f, x)
  }
}

export class Solution {
  constructor (objectiveValue, fluxes) {
    this.objectiveValue = objectiveValue
    this.fluxes = fluxes
  }
}

export function modelFromWorkerData (data) {
  const model = new Model()
  model.reactions = data.reactions
  model.metabolites = data.metabolites
  model.genes = data.genes
  model.id = data.id
  model.notes = data.notes
  model.description = data.description
  return model
  //  Change when model structure changes significantly from original model JSON. Outputs JSON model data.
}

/**
 * Generate a COBRA Model object from data.
 * @param {*} data - Data representing a COBRA model.
 */
export function modelFromJsonData (data) {
  if (data === null) return null

  const model = new Model()

  // when objective coefficients are not -1, 1, or 0, change them to 1/-1
  model.reactions = data.reactions.map(r => {
    let coeff = 0
    if (r.objective_coefficient && r.objective_coefficient !== 0) {
      if (r.objective_coefficient < 0) coeff = -1
      else coeff = 1
    }
    return ({ ...r, objective_coefficient: coeff })
  })

  model.metabolites = data.metabolites.map(x => ({...x}))
  model.genes = data.genes.map(x => ({...x}))
  model.id = data.id
  model.notes = data.notes // TODO is this an object? if so clone
  model.description = data.description
  return model
}
