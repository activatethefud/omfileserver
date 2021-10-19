<template>
  <div class="search">
    <div class="container">

        <div class="btn-group">
            <a @click="uploadModal = true" name="" id="" class="btn btn-primary" href="#" role="button">Upload</a>

            <b-modal v-model="uploadModal" title="File upload">
                <form class="form">
                    <div class="form-group">
                      <label for="">Description</label>
                      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Enter file description</small>
                    </div>

                    <div class="form-group">
                      <label for="">Tags</label>
                      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
                      <small id="helpId" class="form-text text-muted">Tags separated by space</small>
                    </div>
                    <div class="form-group">
                      <label for=""></label>
                      <input type="file" class="form-control-file" name="" id="" placeholder="" aria-describedby="fileHelpId">
                      <small id="fileHelpId" class="form-text text-muted"></small>
                    </div>
                </form>
            </b-modal>

            <a @click="exportDb()" name="" id="" class="btn btn-primary" href="#" role="button">Export</a>
        </div>

        <div class="form-group">
          <label for="query">Search for <i class="fa fa-search" aria-hidden="true"></i></label>
          <input v-model="searchText" @input="updateResults()" @submit.prevent="" type="text" class="form-control" name="query" id="query" aria-describedby="helpId" placeholder="What are you looking for?">
          <!--<small id="helpId" class="form-text text-muted">Search for</small>-->
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Link</th>
                    <th>Likes/Dislikes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="torrent in torrents" :key="torrent.name">
                    <td scope="row">{{ torrent.name }}</td>
                    <td><a :href="torrent.link" target="_blank">{{ torrent.link }}</a></td>
                    <td>{{ torrent.likes }} <i style="color: green;" class="fa fa-thumbs-up" aria-hidden="true"></i> / {{ torrent.dislikes }} <i style="color: red" class="fa fa-thumbs-down" aria-hidden="true"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import { torrents } from '../../mock'
import editdistance from 'editdistance'
import { saveAs } from 'file-saver'

export default {
    name: 'Search',

    data() {
        return {
            searchText: "",
            torrents: torrents,
            uploadModal: false
        }
    },
    created() {
    },

    computed: {
    },

    methods: {

        exportDb() {
            saveAs(new Blob([JSON.stringify(torrents)]), "db_backup.json");
        },

        updateResults() {
            let compare = editdistance(this.searchText);
            this.torrents = [...torrents].sort((a,b) => 
                compare.distance(a.name) -
                compare.distance(b.name)
            );

            //console.log(this.torrents);
        }
    }
}
</script>

<style>

    #search {
        margin: auto;
    }

    .btn-group {
        margin: 15pt;
    }
</style>