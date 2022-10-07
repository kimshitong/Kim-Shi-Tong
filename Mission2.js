const motorB = ev3_motorB();
const motorC = ev3_motorC();
function calc_degrees_from_cm(cm) {
    const circumference_of_tire = math_PI * 5.6; // in cm
    const num_rotations = cm / circumference_of_tire;
    return num_rotations * 360;
}
function move_x_cm(motor, cm, speed) {
    return ev3_runToRelativePosition(motor, calc_degrees_from_cm(cm), speed);
}
const running_speed = 300;
const ultrasonic_sensor = ev3_ultrasonicSensor(); // declare sensor
function turn(direction) {
    if (direction === "left"){
        ev3_runToRelativePosition(motorB, -140, running_speed);
        ev3_runToRelativePosition(motorC, 140, running_speed);
        ev3_pause(1000);
        return "turned left";
    } else {
        ev3_runToRelativePosition(motorB, 140, running_speed);
        ev3_runToRelativePosition(motorC, -140, running_speed);
        ev3_pause(1000);
        return "turned right";
    }
}

// Q3
function left_or_right() {
    const my_num = math_random();
    //Left
    if (my_num <= 0.5) {
        left_operation();
    }
    // Right
    else {
        right_operation();
    }
}

function left_operation(){
    turn("left");
    ev3_pause(500);
    
    move_x_cm(motorB, 3, running_speed);
    move_x_cm(motorC, 3, running_speed);
    
    turn("right");
    ev3_pause(1000);
    if (ev3_ultrasonicSensorDistance(ultrasonic_sensor) <= 100){
        left_operation();
    }else{
        move_x_cm(motorB, 100, running_speed);
        move_x_cm(motorC, 100, running_speed);
        //goes on straight
        
    }
}


function right_operation(){
    turn("right");
    ev3_pause(1000);
    move_x_cm(motorB, 3, running_speed);
    move_x_cm(motorC, 3, running_speed);
    ev3_pause(500);
    turn("left");
    ev3_pause(1000);
    if (ev3_ultrasonicSensorDistance(ultrasonic_sensor) <= 100) {
        right_operation();
    }else{
        //goes on straight
        move_x_cm(motorB, 100, running_speed);
        move_x_cm(motorC, 100, running_speed);
    }
}
                 
function avoid_obstacle() {
    const d_to_obstacle = calc_degrees_from_cm(display(ev3_ultrasonicSensorDistance(ultrasonic_sensor)) - 100);
    // Bot will run to infront of the obstacle (10 cm infront the box) 
    ev3_runToRelativePosition(motorB, display(d_to_obstacle), 300);
    ev3_runToRelativePosition(motorC, d_to_obstacle, 300);
    
    return left_or_right();

}


avoid_obstacle();
