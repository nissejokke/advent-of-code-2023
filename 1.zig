const std = @import("std");
const print = std.debug.print;

pub fn main() !void {
    const data = try readFile("input.txt");
    defer data.deinit();

    var sum: u32 = 0;
    for (data.items) |line| {
        var is_first = true;
        var first: u8 = 0;
        var last: u8 = 0;
        for (line) |c| {
            if (c >= '0' and c <= '9') {
                const val = c - '0';
                if (is_first) {
                    first = val;
                    last = val;
                    is_first = false;
                } else {
                    last = val;
                }
            }
        }
        sum += first * 10 + last;
    }
    print("{d}\n", .{sum});
}

fn readFile(filename: []const u8) !std.ArrayList([]u8) {
    const file = try std.fs.cwd().openFile(filename, .{});
    defer file.close();

    var buf_reader = std.io.bufferedReader(file.reader());
    var in_stream = buf_reader.reader();

    var data = std.ArrayList([]u8).init(std.heap.c_allocator);

    var buf: [1024]u8 = undefined;
    while (try in_stream.readUntilDelimiterOrEof(&buf, '\n')) |line| {
        const copy = try std.heap.c_allocator.dupe(u8, line);
        try data.append(copy);
    }

    return data;
}
