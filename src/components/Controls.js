import React, { useEffect, useState } from "react";
import GLTFExporter from "three-gltf-exporter";

import {
  ControlsContainer,
  RadioButton,
  Total,
  SettingsButton,
  CloseButton,
} from "../styles/styles";
import Colors from "./controls/Colors";

const Controls = ({ Scene3D }) => {
  const [topWidth, setTopWidth] = useState(20);
  const [topDepth, setTopDepth] = useState(20);
  const [sideHeight, setSideHeight] = useState(1);

  const [sphereWidthX, setSphereWidthX] = useState(1);
  const [sphereWidthY, setSphereWidthY] = useState(1);
  const [sphereHeight, setSphereHeight] = useState(0);

  const [sphereMoveX, setSphereMoveX] = useState(0);
  const [sphereMoveY, setSphereMoveY] = useState(4);
  const [sphereMoveZ, setSphereMoveZ] = useState(0);

  const [total, setTotal] = useState(300);
  const [realWidth, setRealWidth] = useState(6);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectMenu, setSelectMenu] = useState("table");
  const [direct, setDirect] = useState("z");

  const changeTopSize = (part1, part2, position, width) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );
    currentItems.map((item) => {
      item.scale[position] = width;
      // console.log(Scene3D);
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  const changeTopMove = (part1, part2, position, width) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );

    const currentName = Scene3D.scene.children.filter(
      (item) => item.name === "sink-plane"
    );

    var x, y, z;

    x = currentName[0].position.x;
    y = currentName[0].position.y;
    z = currentName[0].position.z;

    // console.log(currentItems);
    currentItems.map((item) => {
      item.position[position] = width;

      if (item.name === "water-plane") {
        if (direct === "top") {
          item.position.z = parseFloat(z) + parseFloat(0);
          item.position.x = parseFloat(x);
          item.position.y = 3;
        } else if (direct === "bottom") {
          item.position.x = parseFloat(x) + parseFloat(0);
          item.position.z = parseFloat(z) + parseFloat(-9);
          item.position.y = 3;
        } else if (direct === "right") {
          item.position.x = parseFloat(x) + parseFloat(-4.5);
          item.position.z = parseFloat(z) + parseFloat(-4.5);
          item.position.y = 3;
        } else if (direct === "left") {
          item.position.x = parseFloat(x) + parseFloat(4.5);
          item.position.z = parseFloat(z) + parseFloat(-4.5);
          item.position.y = 3;
        }
        // item.position[position] = width;
        console.log(item);
      }
      // console.log(item);
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  const changeTopPosition = (part1, part2) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );

    const currentName = Scene3D.scene.children.filter(
      (item) => item.name === "sink-plane"
    );

    var x, y, z;

    x = currentName[0].position.x;
    y = currentName[0].position.y;
    z = currentName[0].position.z;

    // console.log(currentItems);
    currentItems.map((item) => {
      if (direct === "top") {
        item.position.z = parseFloat(z) + parseFloat(0);
        item.position.x = parseFloat(x);
        item.position.y = 3;
      } else if (direct === "bottom") {
        item.position.x = parseFloat(x) + parseFloat(0);
        item.position.z = parseFloat(z) + parseFloat(-9);
        item.position.y = 3;
      } else if (direct === "right") {
        item.position.x = parseFloat(x) + parseFloat(-4.5);
        item.position.z = parseFloat(z) + parseFloat(-4.5);
        item.position.y = 3;
      } else if (direct === "left") {
        item.position.x = parseFloat(x) + parseFloat(4.5);
        item.position.z = parseFloat(z) + parseFloat(-4.5);
        item.position.y = 3;
      }
      // item.position[position] = width;
      console.log(item);
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  // console.log(direct);

  const changeHeight = (part1, part2, position, height) => {
    const currentItems = Scene3D.scene.children.filter(
      (item) => item.name === part1 || item.name === part2
    );

    currentItems.map((item) => {
      item.scale[position] = height;
      const multi = item.geometry.parameters.height * height;
      const diff = multi - item.geometry.parameters.height;
      const sub = -diff / 2;
      item.position.set(item.position.x, sub, item.position.z);
      Scene3D.renderer.render(Scene3D.scene, Scene3D.camera);
    });
  };

  useEffect(() => {
    const width = topWidth / 20;
    setRealWidth(realWidth * width);
    if (Scene3D.scene) changeTopSize("top-plane", "top-ruler", "y", width);
  }, [topWidth]);

  // useEffect(() => {
  //   const width = sphereWidthX / 20;
  //   if (Scene3D.scene) changeTopSize("sphere-plane", null, "z", width);
  // }, [sphereWidthX]);

  // useEffect(() => {
  //   const width = sphereWidthY / 20;
  //   if (Scene3D.scene) changeTopSize("sphere-plane", null, "y", width);
  // }, [sphereWidthY]);

  // useEffect(() => {
  //   const height = parseFloat(sphereHeight);
  //   if (Scene3D.scene) changeTopSize("sphere-plane", null, "x", height);
  // }, [sphereHeight]);

  useEffect(() => {
    const width = sphereMoveX;
    if (Scene3D.scene) changeTopMove("sink-plane", "water-plane", "x", width);
  }, [sphereMoveX]);

  // useEffect(() => {
  //   const width = sphereMoveY;
  //   if (Scene3D.scene) changeTopMove("sphere-plane", null, "y", width);
  // }, [sphereMoveY]);

  useEffect(() => {
    const width = sphereMoveZ;
    if (Scene3D.scene) changeTopMove("sink-plane", "water-plane", "z", width);
  }, [sphereMoveZ]);

  useEffect(() => {
    const width = topDepth / 20;
    if (Scene3D.scene) changeTopSize("top-plane", "top-ruler", "z", width);
  }, [topDepth]);

  useEffect(() => {
    const height = parseFloat(sideHeight);
    if (Scene3D.scene) changeHeight("side-plane", "side-ruler", "y", height);
  }, [sideHeight]);

  useEffect(() => {
    if (Scene3D.scene) changeTopPosition("water-plane", null);
  }, [direct]);

  const calculateTotal = () => {
    const widthTotal = (topWidth - 20) * 10;
    const topTotal = (topDepth - 20) * 10;
    const sideTotal = sideHeight * 15;
    const newTotal = 300 + widthTotal + topTotal + sideTotal;
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal();
  }, [topWidth, topDepth, sideHeight]);

  // console.log(sphereMoveY);

  return controlsOpen ? (
    <ControlsContainer>
      <div style={{ display: "flex", flexDirection: "row", margin: "0 10px" }}>
        <h3
          style={{ color: "#fff", marginRight: "30px", cursor: "pointer" }}
          onClick={() => setSelectMenu("table")}
        >
          Table
        </h3>
        <h3
          style={{ color: "#fff", cursor: "pointer" }}
          onClick={() => setSelectMenu("sphere")}
        >
          Sphere
        </h3>
      </div>
      <CloseButton
        onClick={() => setControlsOpen(!controlsOpen)}
        src="../../cancel.png"
        alt="Settings"
      />
      {selectMenu === "table" ? (
        <>
          <RadioButton>
            <label>Top Plane Width</label>
            <input
              type="range"
              min="0"
              max="40"
              value={topWidth}
              step="0.01"
              onChange={(e) => setTopWidth(e.target.value)}
            />
          </RadioButton>

          <RadioButton>
            <label>Top Plane Depth</label>
            <input
              type="range"
              min="0"
              max="40"
              value={topDepth}
              step="0.01"
              onChange={(e) => setTopDepth(e.target.value)}
            />
          </RadioButton>

          <RadioButton>
            <label>Change height</label>
            <input
              type="range"
              min="1"
              max="2"
              value={sideHeight}
              step="0.01"
              onChange={(e) => setSideHeight(e.target.value)}
            />
          </RadioButton>

          <Colors Scene3D={Scene3D} />
          <Total>
            <p>Total: {Math.round(total)}</p>
          </Total>
        </>
      ) : (
        <>
          {/* <RadioButton>
            <label>Sphere Plane X</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sphereWidthX}
              step="0.01"
              onChange={(e) => setSphereWidthX(e.target.value)}
            />
          </RadioButton>

          <RadioButton>
            <label>Sphere Plane Y</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sphereWidthY}
              step="0.01"
              onChange={(e) => setSphereWidthY(e.target.value)}
            />
          </RadioButton>

          <RadioButton>
            <label>Sphere Height</label>
            <input
              type="range"
              min="-1"
              max="100"
              value={sphereHeight}
              step="0.01"
              onChange={(e) => setSphereHeight(e.target.value)}
            />
          </RadioButton> */}

          <RadioButton>
            <label>Sink Move X</label>
            <input
              type="range"
              min="-10"
              max="10"
              value={sphereMoveX}
              step="0.001"
              onChange={(e) => setSphereMoveX(e.target.value)}
            />
          </RadioButton>

          {/* <RadioButton>
            <label>Sphere Move Y</label>
            <input
              type="range"
              min="3.96"
              max="6.23"
              value={sphereMoveY}
              step="0.001"
              onChange={(e) => setSphereMoveY(e.target.value)}
            />
          </RadioButton> */}

          <RadioButton>
            <label>Sink Move Z</label>
            <input
              type="range"
              min="-10"
              max="10"
              value={sphereMoveZ}
              step="0.001"
              onChange={(e) => setSphereMoveZ(e.target.value)}
            />
          </RadioButton>
          <button onClick={() => setDirect("top")}>Top</button>
          <button onClick={() => setDirect("left")}>Left</button>
          <button onClick={() => setDirect("bottom")}>Bottom</button>
          <button onClick={() => setDirect("right")}>Right</button>
          <button
            onClick={() => {
              const exporter = new GLTFExporter();

              exporter.parse(Scene3D.scene, function (gltf) {
                console.log(gltf);
                // downloadJSON( gltf );
                const fileName = "file";
                const json = JSON.stringify(gltf);
                const blob = new Blob([json], { type: "application/json" });
                const href = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = href;
                link.download = "test" + ".gltf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              });
            }}
          >
            Download
          </button>
        </>
      )}
    </ControlsContainer>
  ) : (
    <SettingsButton
      onClick={() => setControlsOpen(!controlsOpen)}
      src="../../setting.png"
      alt="Settings"
    />
  );
};

export default Controls;
