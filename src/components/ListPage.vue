<template>
  <div class="container">
    <div class="heading">{{msg}}</div>
    <div class="form-conatiner">
      <form>
        <input class="input-field" type="text" placeholder="City to be added" v-model="cityName" />
        <button type="submit" class="add-button" @click="addCity()">Add</button>
      </form>
    </div>
    <ul>
      <li v-for="(city, index) in cities" :key="index">
        <div @click="gotoDetailsPage(city)" class="list-name">{{city}}</div>
        <div class="delete-icon fa fa-trash" @click="deleteCity(index)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../store/index'

export default {
  name: 'ListPage',
  computed: {
    cities () {
      return store.state.cities
    }
  },
  data () {
    return {
      msg: 'Welcome to list page',
      cityName: ''
    }
  },
  methods: {
    addCity () {
      if (this.cityName !== '' && this.cityName !== null && this.cityName !== undefined) {
        store.commit('addCity', this.cityName)
        this.cityName = ''
      } else {
        alert('Please enter city name')
      }
    },
    deleteCity (index) {
      store.commit('deleteCity', index)
    },
    gotoDetailsPage (city) {
      this.$router.push('/details/' + city)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    padding-top: 60px;
  }
  .heading {
    text-align: center;
    font-size: 3em;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0;
    text-shadow: 0 1px 2px rgba(black,.15);
  }
  .form-conatiner {
    padding-top: 30px;
  }
  .input-field {
    width: 360px;
    background: #fff;
    color: #a3a3a3;
    font: inherit;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
  .add-button {
    background: #7f8ff4;
    color: #fff;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 12px 36px;
    display: inline-block;
    border: 0;
    outline: 0;
    margin-left: -50px;
  }
  ul, li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul {
    margin-top: 50px;
  }
  li {
    padding: 5px 10px;
    display: block;
    width: 45%;
    margin: 0 auto;
    text-align: left;
  }
  li > .list-name {
    display: inline-block;
    width: 96%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
  }
  li > .delete-icon {
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
  }
</style>
