/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

const {
  spinalPanelManagerService,
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");
const {
  SpinalForgeExtention
} = require("spinal-env-viewer-panel-manager-service_spinalforgeextention");

import Vue from "vue";
import aVueCompoment from "./testCompoment.vue";
import aVueCompomentDialog from "./testCompomentDialog.vue";
const {
  spinalContextMenuService,
  SpinalContextApp
} = require("spinal-env-viewer-context-menu-service");

// create a node
const extentionCreated = SpinalForgeExtention.createExtention({
  name: "my_test_Extention",
  vueMountComponent: Vue.extend(aVueCompoment),
  // toolbar is optional
  toolbar: {
    icon: "done",
    label: "testLabel",
    subToolbarName: "spinalcom"
  },
  panel: {
    title: "Spinalcom Panel",
    classname: "spinal-pannel",
    closeBehaviour: "hide" // if something else panel is deleted
  },
  style: {
    left: "405px"
  },
  onLoad: function(){},
  onUnLoad: function(){}
});

SpinalForgeExtention.registerExtention("my_test_Extention", extentionCreated);

SpinalMountExtention.mount({
  name: "myCustomDialogName",
  vueMountComponent: Vue.extend(aVueCompomentDialog),
  parentContainer: document.body
});

// create an test class that extends of SpinalContextApp
class SideBarApp1 extends SpinalContextApp {
  constructor() {
    super("SideBarApp1", "SideBarApp1 test description", {
      icon: "add",
      icon_type: "in",
      backgroundColor: "#0000FF",
      fontColor: "#FFFFFF"
    });
  }

  isShown() {
    // if (option.testsFail === true) return Promise.resolve(-1);
    return Promise.resolve(true);
  }

  action(option) {
    option.paramSent = "hello from SideBarApp1";
    spinalPanelManagerService.openPanel("my_test_Extention", option);

    console.log("action clicked");
  }
}

spinalContextMenuService.registerApp("GraphManagerSideBar", new SideBarApp1());

class SideBarApp2 extends SpinalContextApp {
  constructor() {
    super("SideBarApp2", "SideBarApp2 test description", {
      icon: "update",
      icon_type: "in",
      backgroundColor: "#FF00FF",
      fontColor: "#00FFFF"
    });
  }

  isShown(option) {
    console.log(option);
    if (
      option &&
      option.selectedNode &&
      option.selectedNode.getName().equals("Floor0")
    )
      return Promise.resolve(-1);
    return Promise.resolve(true);
  }

  action(option) {
    option.paramSent = "hello from SideBarApp2";
    spinalPanelManagerService.openPanel("my_test_Extention", option);
    console.log("action clicked");
  }
}

spinalContextMenuService.registerApp("GraphManagerSideBar", new SideBarApp2());

class GolbalTopBar extends SpinalContextApp {
  constructor() {
    super("GolbalTopBar", "GolbalTopBar test description", {
      icon: "update",
      icon_type: "in",
      backgroundColor: "#FF00FF",
      fontColor: "#00FFFF"
    });
  }

  isShown(option) {
    console.log(option);
    return Promise.resolve(true);
  }

  action(option) {
    option.paramSent = "hello from GolbalTopBar";
    spinalPanelManagerService.openPanel("my_test_Extention", option);
    console.log("action clicked");
  }
}

spinalContextMenuService.registerApp(
  "GraphManagerGlobalBar",
  new GolbalTopBar()
);
