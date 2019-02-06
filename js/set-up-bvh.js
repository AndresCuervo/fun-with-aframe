let BVHLoader = new THREE.BVHLoader()

AFRAME.registerComponent('add-bvh', {
schema : {
    file : { default : '' },
    visible : { default : false }
},
setUpBVH: function() {
    this.clock = new THREE.Clock();
    BVHLoader.load( this.data.file, function( result ) {
        // console.log("skele: ", result.skeleton)
        // console.log("bones: ", result.skeleton.bones)
        result.skeleton.bones = result.skeleton.bones.map((bone) => {
            // console.log(bone.name)
            let texture;

            // console.log(bone.position.y * bone.position.z)
            let geometry = new THREE.SphereGeometry( 1.0, 16, 16)
            let material = new THREE.MeshNormalMaterial()
            let mesh = new THREE.Mesh( geometry, material )

            this.el.sceneEl.object3D.add(mesh)
            bone.add(mesh)
            return bone
        })

        let skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] )

        skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly
        // skeletonHelper.material.linewidth = 30;
        skeletonHelper.material.linewidth = 2;
        skeletonHelper.material.opacity = 1


        // this.el.sceneEl.object3D.add(skeletonHelper)

        this.boneContainer = new THREE.Group();
        this.boneContainer.add( result.skeleton.bones[ 0 ] );
        let newScale = 0.5
        this.boneContainer.scale.set(newScale, newScale, newScale)

        // this.el.object3D.add( skeletonHelper );
        this.el.object3D.add( this.boneContainer );

        // play animation
        // this.mixer = new THREE.AnimationMixer( skeletonHelper );
        this.mixer = new THREE.AnimationMixer( skeletonHelper );
        this.mixer.clipAction( result.clip ).setEffectiveWeight( 1.0 ).play();
        console.log(" ------ DONE -----")
    }.bind(this))
},
init : function () {
    // this.setUpBVH()
    this.el.setAttribute('visible', this.data.visible)
},
tick : function () {
    // Animate the mocap data
    if ( this.mixer ) this.mixer.update( this.clock.getDelta() )
},
update: function () {
    // console.log("New data!", this.data)
    this.setUpBVH()
}
})

