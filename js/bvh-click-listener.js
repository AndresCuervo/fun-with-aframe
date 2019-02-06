// BVH click listener
let aframeScene = document.querySelector('a-scene').sceneEl
let scene = aframeScene.object3D
let mocapBaseID = 'BVH-'
let mocapElements = document.querySelectorAll(`[id^=${mocapBaseID}]`)
let mocapElementsNum = mocapElements.length
let mocapIndex = 0

// let bvhEntity = document.document('bvh-entity')
aframeScene.addEventListener('click', function (event) {
    /*
    // This is useful if you want to dynamically load these
    let group = bvhEntity.object3D
    for (var i = group.children.length - 1; i >= 0; i--) {
        group.remove(group.children[i]);
    }
    scene.remove(group)
    if (Math.random() < 0.5) {
        bvhEntity.setAttribute('add-bvh', 'file: ./CMU-BVH-files/14/14_03.bvh')
    } else {
        bvhEntity.setAttribute('add-bvh', 'file: ./CMU-BVH-files/12/12_01.bvh')
    }
    console.log(bvhEntity.getAttribute('add-bvh'))
    */

    // But we're just going to do a simple "visible" trick, since we only have 4 things to manage!
    mocapElements[mocapIndex].setAttribute('visible', false)
    mocapIndex = (mocapIndex + 1) % mocapElementsNum
    mocapElements[mocapIndex].setAttribute('visible', true)
})

