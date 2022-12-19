import { Body, Box, Vec3 } from "cannon-es";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Dog {
  public mesh: Group;
  public body = new Body({ mass: 1 });

  constructor() {
    this.mesh = new Group();
    const gltf = new GLTFLoader();
    gltf.load("/models/sushi_dog/scene.gltf", (gltf) => {
      const root = gltf.scene;
      root.scale.set(50, 50, 50);
      
      this.mesh.add(root);
    });

    this.body.addShape(new Box(new Vec3(0.5, 0.5, 0.7)), new Vec3(0, -0.25, 0.2));
  }

  public update() {
    this.mesh.position.x = this.body.position.x;
    this.mesh.position.y = this.body.position.y;
    this.mesh.position.z = this.body.position.z;

    this.mesh.quaternion.x = this.body.quaternion.x;
    this.mesh.quaternion.y = this.body.quaternion.y;
    this.mesh.quaternion.z = this.body.quaternion.z;
    this.mesh.quaternion.w = this.body.quaternion.w;
  }
}
