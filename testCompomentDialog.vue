<!--
Copyright 2018 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
  <div>
    <md-dialog :md-active.sync="showDialog"
               @md-closed="closeDialog(false)">
      <md-dialog-title>my custom prompt</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Select Value</label>
          <md-input v-model="inputValue"></md-input>
        </md-field>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary"
                   @click="closeDialog(false)">Close</md-button>
        <md-button class="md-primary"
                   @click="closeDialog(true)">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "testCompomentDialog",
  props: ["onFinised"],
  data() {
    return {
      showDialog: true,
      inputValue: ""
    };
  },
  methods: {
    opened(option) {
      console.log("opened dialog", option);
      this.inputValue = option.paramSent;
    },
    removed(option) {
      this.showDialog = false;
      console.log("removed dialog", option);
    },
    closeDialog(closeResult) {
      if (typeof this.onFinised === "function")
        this.onFinised({ closeResult, inputValue: this.inputValue });
    }
  }
};
</script>
