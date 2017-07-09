export function findAndUpdate(collection: Array<any>, value: any, addIfNotFound?: boolean) {
  let found = false;
  for (let i = 0; i < collection.length; i++) {
    if (value.id === collection[i].id) {
      collection[i] = value;
      found = true;
      break;
    }
  }
  if (!found && addIfNotFound) {
    collection.push(value);
  }
}

export function removeItem(collection: Array<any>, value: any) {
  let index = -1;
  for (let i = 0; i < collection.length; i++) {
    if (value.id === collection[i].id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    collection.splice(index, 1);
  }
}