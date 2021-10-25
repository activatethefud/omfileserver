<template>
  <div class="search">
    <div class="container">

        <div class="btn-group">
            <a @click="uploadModal = true" name="" id="" class="btn btn-primary" href="#" role="button">Upload</a>

            <b-modal hide-footer v-model="uploadModal" title="File upload">
                <form @submit.prevent="" class="form">

                    <div class="form-group">
                      <label for="">Title</label>
                      <input required minlength="5" v-model="uploadedFileTitle" type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId">
                      <small id="helpId" class="text-muted">Enter file title</small>
                    </div>

                    <div class="form-group">
                      <label for="">Description</label>
                      <textarea required minlength="10" v-model="uploadedFileDescription" class="form-control" name="" id="" rows="3"></textarea>
                    </div>

                    <div class="form-group">
                      <label for=""></label>
                      <input @input="changeUploadedFile($event)" type="file" class="form-control-file" name="" id="" placeholder="" aria-describedby="fileHelpId">
                      <small id="fileHelpId" class="form-text text-muted"></small>
                    </div>

                    <div class="form-group">
                      <label for="">Torrent trackers</label>
                      <textarea class="form-control" name="" id="" rows="3"></textarea>
                    </div>

                    <button @click="uploadFile()" type="submit" class="btn btn-primary">Submit</button>
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
                <tr v-for="(torrent,idx) in torrents" :key="torrent.name">
                    <td scope="row">{{ torrent.name }}</td>
                    <td><a :href="torrent.link" target="_blank">{{ torrent.link }}</a></td>
                    <td>{{ torrent.likes }} <i @click="torrents[idx].likes++" style="color: green;" class="fa fa-thumbs-up" aria-hidden="true"></i> / {{ torrent.dislikes }} <i @click="torrents[idx].dislikes++" style="color: red" class="fa fa-thumbs-down" aria-hidden="true"></i></td>
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
import createTorrent from 'create-torrent'

export default {
    name: 'Search',

    data() {
        return {
            searchText: "",
            torrents: torrents,
            uploadModal: false,
            uploadedFileTitle: "",
            uploadedFileDescription: "",
            uploadedFile: null,
        }
    },
    created() {
    },

    computed: {
    },

    methods: {

        uploadFile() {
            console.log("Uploading",
                this.uploadedFileTitle,
                this.uploadedFileDescription,
                this.uploadedFile
            );

            const options = {
                announceList: [
                    [
                        'http://p4p.arenabg.com:1337/announce',
                        'udp://tracker.opentrackr.org:1337/announce',
                        'udp://9.rarbg.com:2810/announce',
                        'udp://exodus.desync.com:6969/announce',
                        'udp://tracker.tiny-vps.com:6969/announce',
                        'udp://tracker.openbittorrent.com:6969/announce',
                        'udp://tracker.loadbt.com:6969/announce',
                        'udp://retracker.lanta-net.ru:2710/announce',
                        'udp://open.stealth.si:80/announce',
                        'udp://bt2.archive.org:6969/announce',
                        'udp://bt1.archive.org:6969/announce',
                        'https://tracker.nanoha.org:443/announce',
                        'https://tracker.lilithraws.cf:443/announce',
                        'https://tracker.iriseden.fr:443/announce',
                        'https://tracker.iriseden.eu:443/announce',
                        'https://1337.abcvg.info:443/announce',
                        'http://tracker1.bt.moack.co.kr:80/announce',
                        'http://tracker.openbittorrent.com:80/announce',
                        'http://t.nyaatracker.com:80/announce',
                        'http://t.acg.rip:6699/announce'
                    ]
                ]
            }

            createTorrent(this.uploadedFile, options, (err,torrent) => {
                if(!err) {
                    console.log("Torrent uploading...");
                    saveAs(new Blob([torrent]), (new Date()).getTime() + '.torrent');
                }
            });
        },

        changeUploadedFile(event) {
            this.uploadedFile = event.target.files[0];
        },

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