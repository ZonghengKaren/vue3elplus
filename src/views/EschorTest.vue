<template>

    <figure>
      <div id="map_container_1" style="width: 100%;height: 700px"></div>
    </figure>
</template>

<script setup>
import Builder, {libs} from 'escher';
// const jsonPath = require('@/utils/escher/iJO1366.json');
const jsonPath = 'http://bigg.ucsd.edu/escher_map_json/iJO1366.Nucleotide%20metabolism';
const d3Json = libs.d3_json;
const d3Select = libs.d3_select;

// console.log(escher);
console.log(jsonPath);


/**
 * 生命周期函数 - 页面挂载
 */
onMounted(() => {
  nextTick(() => {
    d3Json(jsonPath, function(e, data) {
      if (e) throw Error(e)
      console.log(e)
      console.log(data)
      // ---------------------------------------
      // First map: Just show the map
      // ---------------------------------------

      var options1 = {
        /* just show the zoom buttons */
        menu: 'all',
        // use the smooth pan and zoom option
        use_3d_transform: true,
        /* no editing in this map */
        enable_editing: true,
        /* no keyboard shortcuts */
        enable_keys: true,
        reaction_data: data,
        fill_screen: false,
        never_ask_before_quit: true,
        show_gene_reaction_rules: true,
        full_screen_button: true,
      }

      Builder(data, null, null, d3Select('#map_container_1'), options1)
    })

  })
})
</script>

<style lang="scss" scoped>
#EschorTest {
  width: 90%;
  height: 800px;
  margin: 0 auto;
}
</style>