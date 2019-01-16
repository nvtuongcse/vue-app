/*eslint-disable*/
<template>
  <div class="work-book">
    <!-- Editable table -->
    <div class="card">
      <h3 class="card-header text-center font-weight-bold text-uppercase py-4">Data</h3>
      <div class="card-body">
        <div id="table" class="table-editable">
          <table
            class="table table-bordered table-responsive-md table-striped text-center"
            v-for="(sheet, index) in workSheets"
            :key="index"
          >
            <tr>
              <th class="text-center" v-for="(data, index) in sheet[0]" :key="index">{{ data }}</th>
              <th class="text-center" v-show="workSheets[0].length!=0">Remove</th>
            </tr>
            <tr v-for="(row, index) in workSheets[0]" :key="index" v-show="index>0">
              <td v-bind:onChange="data=event.targe.value" 
                class="pt-3-half"
                contenteditable="true"
                v-for="(data, index) in row"
                :key="index"  
              >{{data}}</td>
              <span class="table-remove">
                <button type="button" class="btn btn-danger btn-rounded btn-sm my-0">Remove</button>
              </span>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="publish">
        <a @click="$refs.fileInput.click()">Add a file</a>
        <div class="loader" v-show="spiner"></div>
        <input type="file" style="display: none" @change="onFileSelected" ref="fileInput">
      </div>
    </div>
  </div>
</template>


<script>
/*eslint-disable*/
import axios from "axios";
import { read, utils } from "xlsx";
import path from "path-dirname";

export default {
  name: "WorkBook",
  methods: {
    onFileSelected(e) {
      this.spiner = true;
      let reader = new FileReader();
      reader.onload = e => {
        const bstr = e.target.result;
        this.workBook = read(bstr, { type: "binary" });
        this.workBook.SheetNames.forEach(sName => {
          this.workSheets = [
            utils.sheet_to_json(this.workBook.Sheets[sName], {
              header: 1
            })
          ];
        });
        console.log(this.workSheets);
      };
      reader.readAsBinaryString(e.target.files[0]);
      this.spiner = false;
    }
  },
  data() {
    return {
      spiner: false,
      workBook: null,
      workSheets: [[]]
    };
  }
};
</script>

<style scoped>
.work-book {
  background: whitesmoke;
  padding-top: 60px;
  width: 100%;
  min-height: 100%;
}

a {
  float: left;
  font-size: 12px;
  font-family: "Courier New", Courier, monospace;
}
a:hover {
  text-decoration: underline;
  cursor: pointer;
}

.container {
  width: 60%;
  margin: auto;
}

.publish {
  text-align: center;
}
.publish::after {
  clear: both;
}

.loader {
  float: left;
  border: 2px solid gray;
  border-radius: 50%;
  border-top: 2px solid greenyellow;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

label {
  margin: 2px;
  float: right;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  color: gray;
}

input[type="text"] {
  border: none;
  background: whitesmoke;
  font-size: 24px;
  font-family: "Courier New", Courier, monospace;
  font-weight: bolder;
  width: 100%;
  outline: none;
  margin-bottom: 5px;
  text-align: center;
  box-shadow: 1px 1px 1px 1px gray;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
