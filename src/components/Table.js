import * as THREE from "three";

export default class Table {
  constructor(topPlane, sidePlane, backPlane, spherePlane, sinkMove) {
    this.topPlane = topPlane;
    this.sidePlane = sidePlane;
    this.backPlane = backPlane;
    this.spherePlane = spherePlane;
    this.sinkMove = sinkMove;
  }

  init({ scene, camera, renderer }) {
    const sideGeometry = new THREE.BoxGeometry( // ความหนาขาโต๊ะ
      this.sidePlane.x,
      this.sidePlane.y,
      this.sidePlane.z
    );
    const bottomMaterial = new THREE.MeshLambertMaterial({
      color: "#f0dea6",
      side: THREE.DoubleSide,
    });

    const leftSide = new THREE.Mesh(sideGeometry, bottomMaterial); // ขาโต๊ะ
    leftSide.position.x = 5;
    leftSide.name = "side-plane";
    scene.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeometry, bottomMaterial); // ขาโต๊ะ
    rightSide.position.x = -5;
    rightSide.name = "side-plane";
    scene.add(rightSide);

    const topMaterial = new THREE.MeshLambertMaterial({
      color: "#996633",
      opacity: 1,
      // overdraw: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const topGeometry = new THREE.BoxGeometry( // ความหน้าบนโต๊ะ
      this.topPlane.x,
      this.topPlane.y,
      this.topPlane.z
    );
    const topPlane = new THREE.Mesh(topGeometry, topMaterial); // บนโต๊ะ
    topPlane.position.y = 4;
    topPlane.rotateZ(-Math.PI / 2);
    topPlane.name = "top-plane";
    scene.add(topPlane);

    const backGeometry = new THREE.BoxGeometry( // ความหนาแกรกลางโต๊ะ
      this.backPlane.x,
      this.backPlane.y,
      this.backPlane.z
    );

    const backPlane = new THREE.Mesh(backGeometry, bottomMaterial); // ตำแหน่งที่ตั้งแกงกลาง
    backPlane.position.y = 2;
    backPlane.position.z = 3;
    backPlane.rotateY(-Math.PI / 2);
    backPlane.name = "back-plane";
    scene.add(backPlane);

    // อ่าง

    const sinkMaterial = new THREE.MeshBasicMaterial({
      opacity: 1,
      // overdraw: 0.5,
      transparent: true,
      color: "red",
      side: THREE.DoubleSide,
    });

    const sinkGeometry = new THREE.BoxGeometry(7, 1.3, 7); // ความหนาแกรกลางโต๊ะ

    sinkGeometry.translate(this.sinkMove.x, this.sinkMove.y, this.sinkMove.z); // -0.35
    // sinkGeometry.rotateZ(29.85);

    const sinkPlane = new THREE.Mesh(sinkGeometry, sinkMaterial); // บนโต๊ะ
    sinkPlane.position.y = 4;
    // sinkPlane.rotateZ(-Math.PI / 2);
    sinkPlane.name = "sink-plane";
    scene.add(sinkPlane);

    // รูระบายน้ำ

    const sinkWaterGeometry = new THREE.SphereBufferGeometry( // ความหน้าบนโต๊ะ
      0.5,
      32,
      16,
      0,
      2 * Math.PI,
      0,
      0.5 * Math.PI
    );
    sinkWaterGeometry.translate(this.sinkMove.x, 0, this.sinkMove.z); // -0.35
    sinkWaterGeometry.rotateZ(29.85);

    const sinkWaterMaterial = new THREE.MeshLambertMaterial({
      color: "#000",
      side: THREE.DoubleSide,
    });

    const sinkWaterPlane1 = new THREE.Mesh(
      sinkWaterGeometry,
      sinkWaterMaterial
    ); // บนโต๊ะ
    sinkWaterPlane1.position.y = 3;
    sinkWaterPlane1.rotateZ(-Math.PI / 2);
    sinkWaterPlane1.name = "sink-plane";
    scene.add(sinkWaterPlane1);

    renderer.render(scene, camera);

    // ก๊อก

    const sinkWaterInGeometry = new THREE.SphereBufferGeometry( // ความหน้าบนโต๊ะ
      0.3,
      32,
      16,
      0,
      2 * Math.PI,
      0,
      0.5 * Math.PI
    );
    sinkWaterInGeometry.translate(this.sinkMove.x, 1.2, this.sinkMove.z + 4.5); // -0.35
    sinkWaterInGeometry.rotateZ(-29.85);

    const sinkWaterInMaterial = new THREE.MeshLambertMaterial({
      color: "#7ff462e",
      side: THREE.DoubleSide,
    });

    const sinkWaterInPlane = new THREE.Mesh(
      sinkWaterInGeometry,
      sinkWaterInMaterial
    ); // บนโต๊ะ
    sinkWaterInPlane.position.y = 3;
    sinkWaterInPlane.rotateZ(-Math.PI / 2);
    sinkWaterInPlane.name = "water-plane";
    scene.add(sinkWaterInPlane);

    renderer.render(scene, camera);
  }
}
