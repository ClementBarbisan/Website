var scene;
var renderer;
var camera;
var flagColor = true;
var geometry;
var material;
var lineWidth;
var canvasWidth = window.innerWidth - 25;
var canvasHeight = window.innerHeight - 25;
var tableCode = [[[[], 0, [], []], [[], 0, [], []], [[], 0, [], []], [[], 0, [], []]],
    [[[], 0, [], []], [[], 0, [], []], [[], 0, [], []], [[], 0, [], []]]];
var tableValue = [[3,2,1,1], [2,2,2,1], [2,1,2,2], [1,4,1,1], [1,1,3,2],
    [1,1,3,2], [1,2,3,1], [1,1,1,4], [1,3,1,2],[1,2,1,3],[3,1,1,2]];
function createShapeDynamic(index, flagColor, indexTable, indexNumber)
{
    var shape = new THREE.Shape();

    //geometry.vertices.push(
    shape.moveTo(-canvasWidth / 2 + lineWidth * index, canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * (index + 1), canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * (index + 1), -canvasHeight / 2 + 100);
    shape.lineTo(-canvasWidth / 2 + lineWidth * index, -canvasHeight / 2 + 100);
    shape.lineTo(-canvasWidth / 2 + lineWidth * index, canvasHeight / 2);
    geometry = new THREE.ShapeBufferGeometry(shape);
    tableCode[indexTable][indexNumber][2] = geometry;
    if (flagColor === 0) {
        material = new THREE.MeshBasicMaterial({
            color:0x000000,
            side:THREE.DoubleSide
        });
        tableCode[indexTable][indexNumber][3] = material;
        var object = new THREE.Mesh(geometry, material);
        tableCode[indexTable][indexNumber][0] = object;
        scene.add(object);}
    else {
        material = new THREE.MeshBasicMaterial({
            color:0xffffff,
            side:THREE.DoubleSide
        });
        tableCode[indexTable][indexNumber][3] = material;
        var object = new THREE.Mesh(geometry, material);
        tableCode[indexTable][indexNumber][0] = object;
        scene.add(object);}
}

function createShape(index, flagColor)
{
    var shape = new THREE.Shape();

    //geometry.vertices.push(
    shape.moveTo(-canvasWidth / 2 + lineWidth * index, -canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * (index + 1), -canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * (index + 1), canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * index, canvasHeight / 2);
    shape.lineTo(-canvasWidth / 2 + lineWidth * index, -canvasHeight / 2);
    geometry = new THREE.ShapeBufferGeometry(shape);
    if (flagColor === 0) {
        material = new THREE.MeshBasicMaterial({
            color:0x000000,
            side:THREE.DoubleSide
        });
        scene.add(new THREE.Mesh(geometry, material));
    }
    else {
        material = new THREE.MeshBasicMaterial({
            color:0xffffff,
            side:THREE.DoubleSide
        });
        scene.add(new THREE.Mesh(geometry, material));
    }
}

function init()
{
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.01, 1000);
    //camera = new THREE.OrthographicCamera(-canvasWidth / 2, canvasWidth / 2, -canvasHeight / 2, canvasHeight / 2, 0.01, 10000);
    camera.position.set(0, 0, 900);
    renderer = new THREE.WebGLRenderer();
    renderer.clearColor(new THREE.Color(0xffffff));
    renderer.setSize(canvasWidth, canvasHeight);
    document.getElementById("canvas").appendChild(renderer.domElement);
    lineWidth = canvasWidth / 67;
    var index = 0;
    for (var k = 0; k < 3; k++)
    {
        createShape(index, k % 2);
        index++;
    }
    for (var val of tableCode[0])
    {
        for (var i = 0; i < tableValue[val[1]].length; i++)
        {
            if (i % 2 === 0)
            {
                for (var j = 0; j < tableValue[val[1]][i]; j++) {
                    createShapeDynamic(index, 0, 0, i);
                    index++;
                }
            }
            else
            {
                for (var l = 0; l < tableValue[val[1]][i]; l++)
                {
                    createShapeDynamic(index, 1, 0, i);
                    index++;
                }
            }
        }
    }
    createShape(index, 1);
    index++;
    createShape(index, 0);
    index++;
    createShape(index, 1);
    index++;
    createShape(index, 0);
    index++;
    createShape(index, 1);
    index++;
    for (var val of tableCode[1])
    {
        for (var n = 0; n < tableValue[val[1]].length; n++)
        {
            if (n % 2 === 1)
            {
                for (var o = 0; o < tableValue[val[1]][n]; o++)
                {
                    createShapeDynamic(index, 0, 1, n);
                    index++;
                }
            }
            else
            {
                for (var p = 0; p < tableValue[val[1]][n]; p++)
                    {
                        createShapeDynamic(index, 1, 1, n);
                        index++;
                    }
            }
        }
    }
    for (var m = 0; m < 3; m++)
    {
        createShape(index, m % 2);
        index++;
    }
    renderer.render(scene, camera);
}