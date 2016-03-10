var sortByOrder = function(object1, object2) {
  if (object1.order > object2.order) {
    return 1;
  } else if (object1.order < object2.order) {
    return -1;
  } else {
    return 0;
  }
}

module.exports = sortByOrder;