import { Body, Box, Vec3 } from "cannon-es";
import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Sheep {
  public mesh: Group;
  public body = new Body({ mass: 1 });

  constructor() {
    this.mesh = new Group();
    const gltf = new GLTFLoader();
    gltf.load("/models/sheep/scene.gltf", (gltf) => {
      const root = gltf.scene;
      root.scale.set(50, 50, 50);
      this.mesh.add(root);
    });

    this.body.addShape(new Box(new Vec3(0.5, 0.5, 0.5)));
  }

  public animate(predator1: Body, predator2: Body) {
    this.predatorInteraction(predator1);
    this.predatorInteraction(predator2);
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

  public predatorInteraction(predator: Body) {
    const distance = this.body.position.distanceTo(predator.position);

    if (distance < 1.5) {
      this.body.position.x -= (predator.position.x - this.body.position.x) / 4;
      this.body.position.z -= (predator.position.z - this.body.position.z) / 4;
    }

    if (distance < 4.5) {
      this.body.position.x -= (predator.position.x - this.body.position.x) / 30;
      this.body.position.z -= (predator.position.z - this.body.position.z) / 30;
    }

    if (distance < 16.5) {
      this.body.position.x -=
        (predator.position.x - this.body.position.x) / 300;
      this.body.position.z -=
        (predator.position.z - this.body.position.z) / 300;
    }
  }
}
