<template>
  <div id="app">
    <!-- <h4>{{ info }}</h4> -->

<br></br>

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

    <div v-else v-for="i in info" class="ptf">

        <span class="lighten">
        {{ i }}
        </span>
        <br></br>

    </div>


      <!-- <div v-else v-for="ptf in info" class="ptf">
        {{ ptf }}
        {{ currency.description }}:
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float }}
        </span>
      </div> -->
    
    </section>
  </div>
</template>


<script>
let axios = require("axios");

export default {
  data() {
    return {
      info: null,
      loading: true,
      errored: false
    };
  },
  //   filters: {
  //     currencydecimal (value) {
  //       return value.toFixed(2)
  //     }
  //   },
  mounted() {
    axios
      .get(
        "https://search-imf-public-sn4wcxrr6mzhs5j3a2w6kr5nxy.us-east-1.es.amazonaws.com/maintenance/_doc/PRODC3D4C6E2CW01-00002CMFPSR-022719-050746286501"
      )
      .then(response => {
        let productInfo = {};
        let source = response.data._source;
        
        if(source.prodcode == 'XT'){

             productInfo.prodname = 'Xpediter';

        }
        
        productInfo.prodcode = source.prodcode;
        productInfo.prodver = source.prodver;
        productInfo.url = source.url;
        productInfo.ptfs = source.p;

        console.log(productInfo);

        this.info = productInfo;
      
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>