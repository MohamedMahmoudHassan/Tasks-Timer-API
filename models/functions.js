function add(acc, item) {
  return acc + item;
}

function analyseTime(time) {
  const ms = time % 1000;
  time = Math.floor(time / 1000);
  const sec = time % 60;
  time = Math.floor(time / 60);
  const min = time % 60;
  time = Math.floor(time / 60);
  const hour = time % 24;
  time = Math.floor(time / 24);
  const day = time;
  return { day, hour, min, sec, ms };
}

module.exports.add = add;
module.exports.analyseTime = analyseTime;
