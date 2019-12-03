use std::fs::File;
use std::io::prelude::*;

fn main() {
    two();
}

fn one_p1() {
    let mut file = File::open("blobs/one.txt").expect("Unable to open the file");
    let mut one_txt = String::new();
    file.read_to_string(&mut one_txt)
        .expect("Unable to read file");

    let mut sum = 0;
    for line in one_txt.split("\n") {
        let num = line.parse::<u32>().unwrap();

        sum += num / 3 - 2;
    }

    println!("Sum: {}", sum);
}

fn one_p2() {
    let mut file = File::open("blobs/one.txt").expect("Unable to open the file");
    let mut one_txt = String::new();
    file.read_to_string(&mut one_txt)
        .expect("Unable to read file");

    let mut sum = 0;
    for line in one_txt.split("\n") {
        let num = line.parse::<i64>().unwrap();

        sum += one_p2_recurse(num);
    }

    println!("Sum: {}", sum);
}

fn one_p2_recurse(input: i64) -> i64 {
    if input <= 0 {
        return 0;
    }
    let needed_fuel = input / 3 - 2;

    println!("{}", needed_fuel);

    return if needed_fuel < 0 {
        0
    } else {
        needed_fuel + one_p2_recurse(needed_fuel)
    };
}

fn two() {
    let mut file = File::open("blobs/two.txt").expect("Unable to open the file");
    let mut txt = String::new();

    file.read_to_string(&mut txt).expect("Unable to read file");

    let mut command_arr: Vec<u32> = txt
        .split(",")
        .map(|el| el.parse::<u32>().unwrap())
        .collect();

    let mut i = 0;
    while i < command_arr.len() {
        println!("{} {}", i, command_arr[i]);

        let mut dest_idx: usize = 0;

        if i + 3 < command_arr.len() {
            dest_idx = command_arr[i + 3] as usize;
        }
        match command_arr[i] {
            1 => {
                command_arr[dest_idx] = command_arr[command_arr[i + 1] as usize]
                    + command_arr[command_arr[i + 2] as usize]
            }
            2 => {
                command_arr[dest_idx] = command_arr[command_arr[i + 1] as usize]
                    * command_arr[command_arr[i + 2] as usize]
            }
            99 => {
                break;
            }
            _ => println!("Invalid opcode: {}", command_arr[i]),
        }
        i += 4; // maybe 3?
    }

    println!("Result: {}", command_arr[0]);
}
