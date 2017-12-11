<template>
  <div>
    <div class="header">
      <h1 class="selected-city">{{cityName}}</h1>
      <select v-model="cityName" data-width="auto" @change="gotoCity()">
        <option :value="city" v-for="(city, index) in cities" :key="index">{{city}}</option>
      </select>
    </div>
    <div v-bind:class="[index === 0 ? 'today' : 'later']" v-for="(detail, index) in details" :key="index">
      <div class="today-container" v-if="index === 0">
        <div class="temp-img-container">
          <div class="description">{{detail.desc}}</div>
          <img src="../assets/clear.png" class="temp-img" />
        </div>
        <div class="today-temp">{{detail.temp}}<sup>o</sup>C</div>
        <div class="min-max">
          <div class="min">{{detail.minTemp}}<sup>o</sup> min</div>
          <div class="max">{{detail.maxTemp}}<sup>o</sup> max</div>
        </div>
      </div>
      <div v-else>
        <div class="later-date-container">
          <span class="later-date">{{detail.date}}</span>
          <span class="later-month">{{detail.month}}</span>
        </div>
        <div class="later-temp-img-container">
          <!-- <img :src="'../assets/' + detail.imgSrc + '.png'" class="later-temp-img" /> -->
          <img src='../assets/clear.png' class="later-temp-img" />
        </div>
        <div class="later-temp">{{detail.temp}}<sup>o</sup>C</div>
        <div class="later-min-max">
          <div class="later-min">{{detail.minTemp}}<sup>o</sup> min</div>
          <div class="later-max">{{detail.maxTemp}}<sup>o</sup> max</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'DetailsPage',
  computed: {
    cities () {
      return store.state.cities
    }
  },
  data () {
    return {
      msg: 'Welcome details page',
      cityName: this.$route.params.name,
      appId: 'ae2f104a323740183a3e4f737f5e9939',
      details: [],
      monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  },
  methods: {
    getWeatherInfo () {
      this.$http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + this.cityName + '&units=metric&appid=' + this.appId).then(function (response) {
        let data = response.body.list
        let dup = []
        data.map((obj, index) => {
          if (index % 8 === 0) {
            let date = new Date(obj.dt_txt)
            let d = {
              date: date.getDate(),
              month: this.monthNames[date.getMonth()],
              temp: obj.main.temp,
              minTemp: obj.main.temp_min,
              maxTemp: obj.main.temp_max,
              desc: obj.weather[0].description,
              imgSrc: obj.weather[0].main.toLowerCase()
            }
            dup.push(d)
          }
        })
        this.details = dup
      }, function (error) {
        console.log(error.statusText)
      })
    },
    gotoCity () {
      this.$router.push('/details/' + this.cityName)
      this.getWeatherInfo()
    }
  },
  mounted: function () {
    this.getWeatherInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    background-color: #999;
    padding: 20px 0px;
    text-align: center;
    position: relative;
  }
  .selected-city {
    color: #fff;
    font-size: 60px;
    display: inline-block;
    line-height: 60px;
    margin: 0px;
  }
  select {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 50px;
    width: 150px;
    height: 45px;
    padding: 0px 10px;
    border-radius: 5px;
  }
  .later {
    position: relative;
    padding: 10px;
    border: 1px solid #aaa;
    display: inline-block;
    width: 25%;
    border-right-width: 0px;
    background-color: #fff;
    height: 100px;
  }
  .later-container:last-child {
    border-right-width: 1px;
  }
  .later-date-container {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #aaa;
    padding: 5px;
    color: #fff;
  }
  .later-date {
    font-weight: bold;
  }
  .later-month {
    font-size: 10px;  
  }
  .later-temp-img-container {
    display: inline-block;
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
  }
  .later-temp-img {
    width: 100%;
    height: 100%;
  }
  .later-temp {
    display: inline-block;
    font-size: 40px;
    line-height: 78px;
    margin-left: -40px;
  }
  .later-min-max {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #aaa;
  }
  .later-min {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    padding: 0px 10px;
    border-bottom: 1px solid #aaa;
  }
  .later-max {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
  }
  .today {
    padding: 30px 0px;
  }
  .temp-img-container {
    display: inline-block;
    width: 25%;
    vertical-align: middle;
  }
  .temp-img {

  }
  .description {
    font-size: 35px;
    line-height: 35px;
    padding-bottom: 20px;
  }
  .today-temp {
    width: 50%;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    margin-left: -4px;
    font-size: 90px;
  }
  .min-max {
    display: inline-block;
    vertical-align: middle;
    width: 25%;
    margin-left: -4px;
  }
  .min, .max {
    font-size: 30px;
    line-height: 112px
  }
</style>
