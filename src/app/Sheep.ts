import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Sheep {
  mesh: Group;
  constructor() {
    this.mesh = new Group();
    const gltf = new GLTFLoader();
    gltf.load("/models/sheep/scene.gltf", (gltf) => {
      const root = gltf.scene;
      root.scale.set(50, 50, 50);
      this.mesh.add(root);
    });
  }
}
