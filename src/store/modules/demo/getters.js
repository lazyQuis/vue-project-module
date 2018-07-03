export default {
  listsFilterByType: state => type => state.lists.filter(list => list.type === type),
};
