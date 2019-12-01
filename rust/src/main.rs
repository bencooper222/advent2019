use std::fs::File;
use std::io::prelude::*;

fn main() {
    one_p2();
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

    return (if needed_fuel < 0 {
        0
    } else {
        needed_fuel + one_p2_recurse(needed_fuel)
    });
}
