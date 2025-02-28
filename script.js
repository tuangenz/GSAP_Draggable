gsap.registerPlugin(Draggable);

// Draggable.create ("img", {
//     type: "x,y",
//     bounds:".container",
//     edgeResistance: 0.8,
//     inertia: true,
// })


// Draggable.create("svg", {
//     type: "x,y",
//     bounds: ".container",
//     edgeResistance: 0.8,
//     inertia: true,
//     onDragEnd: function() {
//         let box = this.target;
//         let maxY = container.clientHeight - box.clientHeight;
        
//         gsap.to(box, {
//             y: Math.min(this.y + 100, maxY), // Rơi nhưng không ra ngoài container
//             duration: 1,
//             ease: "bounce"
//         });
//     }
// });

Draggable.create("svg.bouncy", {
    type: "x,y",
    bounds: ".container",
    edgeResistance: 0.8,
    inertia: true,
    onDragEnd: function() {
        let container = document.querySelector(".container");
        let box = this.target;
        let box_distance = box.offsetTop;
        let container_height = container.clientHeight;
        let drop_distance = container_height - box_distance;

        gsap.to(box, {
            y: drop_distance,
            duration: 1,
            ease: "bounce",
            onUpdate: function () {
                let progress = this.progress(); // Tiến trình rơi 0 tới 1
                let rotationAmount = progress * 180; // Xoay tỷ lệ với khoảng cách rơi
                gsap.set(box, {
                    rotation: rotationAmount,
                }); 
            },
        });
    }
});


gsap.registerPlugin(Draggable);

Draggable.create("img", {
    type: "x,y",
    bounds: ".container2",
    inertia: true,
    onDrag: function() {
        gsap.to(this.target, {
            rotateY: this.y + this.x * 1.5,
        });
    }
});




Draggable.create("svg.main", {
    type: "x,y",
    bounds: ".container3",
    inertia: true,
    transformOrigin: "center center",
    onDragEnd: function() {
        let box3 = this.target;

        let container3 = document.querySelector(".container3");
        let container3_width = container3.clientWidth;
        let container3_height = container3.clientHeight;
        let box3_width = box3.offsetWidth;
        let box3_height = box3.offsetHeight;

        gsap.to(box3, {
            x: -100,
            y: -100,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
        });
    }
});

gsap.registerPlugin(Draggable);

const items = gsap.utils.toArray(".item");

items.forEach(item => {
    let isColliding = false; // Biến kiểm soát trạng thái va chạm

    Draggable.create(item, {
        type: "x,y",
        bounds: ".container4",
        inertia: true,
        onDrag: function() {
            if (isColliding) return; // Nếu đang va chạm, không cần xử lý thêm

            items.forEach(other => {
                if (other !== this.target && this.hitTest(other, "10%")) {
                    isColliding = true; // Đánh dấu trạng thái va chạm

                    let dx = this.x - gsap.getProperty(other, "x");
                    let dy = this.y - gsap.getProperty(other, "y");

                    let moveX = dx > 0 ? 30 : -30; // Đẩy theo chiều ngang
                    let moveY = dy > 0 ? 30 : -30; // Đẩy theo chiều dọc

                    gsap.to(this.target, { x: `+=${moveX}`, y: `+=${moveY}`, duration: 0.2 });
                    gsap.to(other, { x: `-=${moveX}`, y: `-=${moveY}`, duration: 0.2 });

                    setTimeout(() => {
                        isColliding = false; // Reset trạng thái sau 200ms
                    }, 200);
                }
            });
        },
        onDragEnd: function() {
            gsap.to(this.target, { duration: 0.2, ease: "power2.out" }); // Mềm mại khi thả
        }
    });
});

