import { Body, Vec3, World } from "cannon-es";
import {
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Clock,
  Fog,
  PointLight,
  BasicShadowMap,
  DirectionalLight,
  MeshNormalMaterial,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import CannonDebugRenderer from "../utils/cannonDebugRenderer";
import { Border } from "./Border";
import { Dog } from "./Dog";
import { Ground } from "./Ground";
import { Sheep } from "./Sheep";
import { Skybox } from "./Skybox";
import { Music } from "./Music";

export class App {
  private readonly timer = new Clock();
  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    35,
    innerWidth / innerHeight,
    1,
    50000
  );
  private readonly light = new PointLight(0xffffff, 1.25, 5000);
  private readonly light2 = new DirectionalLight(0xffffff, 0.6);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });
  private readonly controls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );
  private world = new World({
    gravity: new Vec3(0, -50.0, 0),
  });
  // private cannonDebugRenderer = new CannonDebugRenderer(this.scene, this.world);
  private dog1 = new Dog();
  private dog2 = new Dog();
  private sheep: Sheep[] = [];
  private x = 0;
  private keyboard: { [key: string]: boolean } = {};
  private skybox = new Skybox();
  private music = new Music("audio/1.mp3");

  constructor() {
    this.setupLight();
    this.setupScene();
    this.setupArea();
    this.setupDogs();
    this.setupSheep();
    this.setupControls();
    this.setupSkybox();
    
    this.camera.position.set(0, 45, 50);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = BasicShadowMap;

    this.render();
  }

  private setupSkybox() {
    this.scene.add(this.skybox.mesh);
  }

  private setupScene() {
    this.scene.background = new Color(0x000000);
    this.scene.fog = new Fog("rgb(135,181,235))", 8000, 30000);
  }

  private setupLight() {
    this.light.position.set(5, 15, 5);
    this.light.castShadow = true;
    this.light.shadow.camera.near = 0.01;
    this.light.shadow.camera.far = 5000;
    this.scene.add(this.light);

    this.light2.position.set(1, 2, 1);
    this.light2.castShadow = true;
    this.light2.shadow.mapSize.width = 4000;
    this.light2.shadow.mapSize.height = 4000;
    this.scene.add(this.light2);
  }

  private setupArea() {
    const ground = new Ground(this.scene, 80, 80);
    this.world.addBody(ground.body);

    const border = new Border(this.scene, this.world);
    border.placeBorder();
  }

  private setupDogs() {
    this.dog1.body.position.set(-20, 0.5, 20);
    this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI);
    this.scene.add(this.dog1.mesh);
    this.world.addBody(this.dog1.body);

    this.dog2.body.position.set(20, 0.5, 20);
    this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI);
    this.scene.add(this.dog2.mesh);
    this.world.addBody(this.dog2.body);
  }

  private setupSheep() {
    for (let i = 0; i < 100; i++) {
      const sheep = new Sheep();
      sheep.body.position.set(
        Math.random() * 40 - 20,
        0.5,
        Math.random() * 40 - 20
      );
      sheep.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI);
      this.scene.add(sheep.mesh);
      this.world.addBody(sheep.body);
      this.sheep.push(sheep);
    }
  }

  private setupControls() {
    window.addEventListener("keydown", (e) => {
      this.keyboard[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keyboard[e.key] = false;
    });
  }

  private keyboardControls() {
    let speed = 0.15;
    if (this.keyboard["w"]) {
      this.dog1.body.position.z -= speed;
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI);
    }
    if (this.keyboard["s"]) {
      this.dog1.body.position.z += speed;
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), 0);
    }
    if (this.keyboard["a"]) {
      this.dog1.body.position.x -= speed;
      this.dog1.body.quaternion.setFromAxisAngle(
        new Vec3(0, 1, 0),
        -Math.PI / 2
      );
    }
    if (this.keyboard["d"]) {
      this.dog1.body.position.x += speed;
      this.dog1.body.quaternion.setFromAxisAngle(
        new Vec3(0, 1, 0),
        Math.PI / 2
      );
    }
    if (this.keyboard["s"] && this.keyboard["d"]) {
      const x = speed;
      const y = speed;
      const angle = Math.atan2(y, x);
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["s"] && this.keyboard["a"]) {
      const x = speed;
      const y = -speed;
      const angle = Math.atan2(y, x);
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["w"] && this.keyboard["d"]) {
      const x = -speed;
      const y = speed;
      const angle = Math.atan2(y, x);
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["w"] && this.keyboard["a"]) {
      const x = -speed;
      const y = -speed;
      const angle = Math.atan2(y, x);
      this.dog1.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }

    if (this.keyboard["ArrowUp"]) {
      this.dog2.body.position.z -= speed;
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), Math.PI);
    }
    if (this.keyboard["ArrowDown"]) {
      this.dog2.body.position.z += speed;
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), 0);
    }
    if (this.keyboard["ArrowLeft"]) {
      this.dog2.body.position.x -= speed;
      this.dog2.body.quaternion.setFromAxisAngle(
        new Vec3(0, 1, 0),
        -Math.PI / 2
      );
    }
    if (this.keyboard["ArrowRight"]) {
      this.dog2.body.position.x += speed;
      this.dog2.body.quaternion.setFromAxisAngle(
        new Vec3(0, 1, 0),
        Math.PI / 2
      );
    }
    if (this.keyboard["ArrowDown"] && this.keyboard["ArrowLeft"]) {
      const x = speed;
      const y = -speed;
      const angle = Math.atan2(y, x);
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["ArrowUp"] && this.keyboard["ArrowLeft"]) {
      const x = -speed;
      const y = -speed;
      const angle = Math.atan2(y, x);
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["ArrowUp"] && this.keyboard["ArrowRight"]) {
      const x = -speed;
      const y = speed;
      const angle = Math.atan2(y, x);
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
    if (this.keyboard["ArrowDown"] && this.keyboard["ArrowRight"]) {
      const x = speed;
      const y = speed;
      const angle = Math.atan2(y, x);
      this.dog2.body.quaternion.setFromAxisAngle(new Vec3(0, 1, 0), angle);
    }
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    const delta = this.timer.getDelta();

    requestAnimationFrame(() => this.render());
    // this.cannonDebugRenderer.update();
    this.world.fixedStep();
    this.dog1.update();
    this.dog2.update();
    for (let i = 0; i < this.sheep.length; i++) {
      this.sheep[i].update();
      this.sheep[i].animate(this.dog1.body, this.dog2.body);
    }

    this.keyboardControls();
    this.adjustCanvasSize();

    // this.x += speed;
    // this.dog1.mesh.position.y += Math.sin(this.x) / 30;

    // this.dog2.mesh.position.y += Math.sin(this.x) / 30;

    this.renderer.render(this.scene, this.camera);
    // this.brick.rotateY(3 * delta);
  }
}
