import {
  Color,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  Clock,
  Fog,
  PointLight,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  BasicShadowMap,
  DirectionalLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Border } from "./Border";
import { Dog } from "./Dog";
import { Ground } from "./Ground";
import { Sheep } from "./Sheep";
import { Skybox } from "./Skybox";

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
  private dog1 = new Dog();
  private dog2 = new Dog();
  private sheep = new Sheep();
  private x = 0;
  private keyboard: { [key: string]: boolean } = {};
  private skybox = new Skybox();

  constructor() {
    this.setupLight();
    this.setupScene();
    this.setupArea();
    this.setupSheep();
    this.setupDogs();
    this.scene.add(this.sheep.mesh);
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
    ground.mesh.rotation.x = -Math.PI / 2;
    ground.mesh.receiveShadow = true;

    const border = new Border(this.scene);
    border.placeBorder();
  }

  private setupSheep() {
    // const sheep = new Sheep()
    // this.scene.add(sheep.mesh)
    // const sheep = new Sheep();
    // sheep.mesh.position.set(
    //   (Math.random() - 0.5) * 40,
    //   0.5,
    //   (Math.random() - 0.5) * 40
    // );
    // sheep.mesh.castShadow = true;
    // this.scene.add(sheep.mesh);
  }

  private setupDogs() {
    this.dog1.mesh.position.set(-20, 0.5, 20);
    this.dog1.mesh.rotateY(Math.PI);
    this.dog1.mesh.castShadow = true;
    this.scene.add(this.dog1.mesh);

    this.dog2.mesh.position.set(20, 0.5, 20);
    this.dog2.mesh.rotateY(Math.PI);
    this.dog2.mesh.castShadow = true;
    this.scene.add(this.dog2.mesh);
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
    if (this.keyboard["w"]) {
      this.dog1.mesh.position.z -= 0.2;
      this.dog1.mesh.rotation.y = 0;
    }
    if (this.keyboard["s"]) {
      this.dog1.mesh.position.z += 0.2;
      this.dog1.mesh.rotation.y = Math.PI;
    }
    if (this.keyboard["a"]) {
      this.dog1.mesh.position.x -= 0.2;
      this.dog1.mesh.rotation.y = -Math.PI / 2;
    }
    if (this.keyboard["d"]) {
      this.dog1.mesh.position.x += 0.2;
      this.dog1.mesh.rotation.y = Math.PI / 2;
    }
    if (this.keyboard["s"] && this.keyboard["d"]) {
      const x = -0.2;
      const y = 0.2;
      const angle = Math.atan2(y, x);
      this.dog1.mesh.rotation.y = angle;
    }
    if (this.keyboard["s"] && this.keyboard["a"]) {
      const x = -0.2;
      const y = -0.2;
      const angle = Math.atan2(y, x);
      this.dog1.mesh.rotation.y = angle;
    }
    if (this.keyboard["w"] && this.keyboard["d"]) {
      const x = 0.2;
      const y = 0.2;
      const angle = Math.atan2(y, x);
      this.dog1.mesh.rotation.y = angle;
    }
    if (this.keyboard["w"] && this.keyboard["a"]) {
      const x = 0.2;
      const y = -0.2;
      const angle = Math.atan2(y, x);
      this.dog1.mesh.rotation.y = angle;
    }

    if (this.keyboard["ArrowUp"]) {
      this.dog2.mesh.position.z -= 0.2;
      this.dog2.mesh.rotation.y = 0;
    }
    if (this.keyboard["ArrowDown"]) {
      this.dog2.mesh.position.z += 0.2;
      this.dog2.mesh.rotation.y = Math.PI;
    }
    if (this.keyboard["ArrowLeft"]) {
      this.dog2.mesh.position.x -= 0.2;
      this.dog2.mesh.rotation.y = -Math.PI / 2;
    }
    if (this.keyboard["ArrowRight"]) {
      this.dog2.mesh.position.x += 0.2;
      this.dog2.mesh.rotation.y = Math.PI / 2;
    }
    if (this.keyboard["ArrowDown"] && this.keyboard["ArrowLeft"]) {
      const x = -0.2;
      const y = -0.2;
      const angle = Math.atan2(y, x);
      this.dog2.mesh.rotation.y = angle;
    }
    if (this.keyboard["ArrowUp"] && this.keyboard["ArrowLeft"]) {
      const x = 0.2;
      const y = -0.2;
      const angle = Math.atan2(y, x);
      this.dog2.mesh.rotation.y = angle;
    }
    if (this.keyboard["ArrowUp"] && this.keyboard["ArrowRight"]) {
      const x = 0.2;
      const y = 0.2;
      const angle = Math.atan2(y, x);
      this.dog2.mesh.rotation.y = angle;
    }
    if (this.keyboard["ArrowDown"] && this.keyboard["ArrowRight"]) {
      const x = -0.2;
      const y = 0.2;
      const angle = Math.atan2(y, x);
      this.dog2.mesh.rotation.y = angle;
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
    this.keyboardControls();
    this.sheep.animate(this.dog1.mesh, this.dog2.mesh);
    this.adjustCanvasSize();

    this.x += 0.2;
    this.dog1.mesh.position.y += Math.sin(this.x) / 30;

    this.dog2.mesh.position.y += Math.sin(this.x) / 30;

    this.renderer.render(this.scene, this.camera);
    // this.brick.rotateY(3 * delta);
  }
}
