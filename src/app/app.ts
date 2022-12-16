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
  PlaneGeometry,
  MeshPhongMaterial,
  BoxGeometry,
  MeshBasicMaterial,
  BasicShadowMap,
  DirectionalLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Dog } from "./Dog";
import { Sheep } from "./Sheep";

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
  // direction light green
  private readonly light2 = new DirectionalLight(0xffffff, 0.6);
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });
  private readonly controls = new OrbitControls(
    this.camera,
    this.renderer.domElement
  );
  private dog1: Dog;
  private dog2: Dog;
  private x = 0;

  constructor() {
    this.setupLight();
    this.setupScene();
    this.setupArea();
    this.setupSheep();

    this.dog1 = new Dog();
    this.dog1.mesh.position.set(-20, 0.5, 20);
    this.dog1.mesh.rotateY(Math.PI);
    this.dog1.mesh.castShadow = true;
    this.scene.add(this.dog1.mesh);
    this.dog2 = new Dog();
    this.dog2.mesh.position.set(20, 0.5, 20);
    this.dog2.mesh.rotateY(Math.PI);
    this.dog2.mesh.castShadow = true;
    this.scene.add(this.dog2.mesh);

    // this.setupSheep();

    this.camera.position.set(0, 45, 50);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color("rgb(0,0,0)"));
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = BasicShadowMap;

    this.render();
  }

  private setupScene() {
    this.scene.background = new Color(0x000000);
    this.scene.fog = new Fog(0xa0a0a0, 8000, 30000);
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
    const ground = new Mesh(
      new PlaneGeometry(80, 80),
      new MeshPhongMaterial({
        color: 0x464646,
        depthWrite: false,
      })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    const border = new Mesh(
      new BoxGeometry(50, 0.18, 0.18),
      new MeshBasicMaterial({ color: 0x232323 })
    );
    border.position.set(0, 0, 25.25);
    border.castShadow = true;
    this.scene.add(border);

    const border2 = border.clone();
    border2.position.set(0, 0, -25.25);
    border2.castShadow = true;
    this.scene.add(border2);

    const border3 = border.clone();
    border3.rotation.y = Math.PI / 2;
    border3.position.set(25.25, 0, 0);
    border3.castShadow = true;
    this.scene.add(border3);

    const border4 = border.clone();
    border4.rotation.y = Math.PI / 2;
    border4.position.set(-25.25, 0, 0);
    border4.castShadow = true;
    this.scene.add(border4);

    const fence = new Mesh(
      new BoxGeometry(13, 0.185, 0.25),
      new MeshBasicMaterial({ color: 0xff0000 })
    );
    fence.position.set(-8, 0.25, 12);
    fence.castShadow = true;
    this.scene.add(fence);

    const fence2 = fence.clone();
    fence2.position.set(8, 0.25, 12);
    fence2.castShadow = true;
    this.scene.add(fence2);

    const fence3 = fence.clone();
    fence3.position.set(-14.5, 0.25, 18.5);
    fence3.rotation.y = Math.PI / 2;
    fence3.castShadow = true;
    this.scene.add(fence3);

    const fence4 = fence.clone();
    fence4.position.set(14.5, 0.25, 18.5);
    fence4.rotation.y = Math.PI / 2;
    fence4.castShadow = true;
    this.scene.add(fence4);
  }

  private setupSheep() {
    for (let i = 0; i < 100; i++) {
      const sheep = new Sheep();
      sheep.mesh.position.set(
        Math.random() * 50 - 25,
        0.5,
        Math.random() * 50 - 25
      );
      sheep.mesh.castShadow = true;
      this.scene.add(sheep.mesh);
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
    this.adjustCanvasSize();

    this.x += 0.2;
    // this.dog1.mesh.rotation.y += 0.01
    // this.dog1.mesh.position.y += Math.sin(this.x) / 30;

    // this.dog2.mesh.rotation.y += 0.01;
    // this.dog2.mesh.position.y += Math.sin(this.x) / 30;

    this.renderer.render(this.scene, this.camera);
    // this.brick.rotateY(3 * delta);
  }
}
