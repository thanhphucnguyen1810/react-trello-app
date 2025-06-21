
/**
 * Capitalize the first letter of a string
 */
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/*
  hàm generatePlaceholderCardId: cách xứ lý bug logic thư viện Dnd-kit khi column là rỗng:
  - Phía FE sẽ tự tạo ra một cái card đặc biệt: placeholder card, ko liên quan đến phía BE.
  - Card đặc biệt này được ẩn ở giao diện người dùng.
  - Cấu trúc Id của card này để unique rất đơn giản, ko cần phải làm random phức tạp.
  - "columnId-placeholder-card" mỗi column chỉ có tối đa một placeholder-card
  - Quan trọng khi tạo: phải đầy đủ: {_id, boardId, columnId, FE_PlaceholderCard}
*/
export const generatePlaceholderCardId = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}