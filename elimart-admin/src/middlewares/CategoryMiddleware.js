function categoryOptions (categoriesOptions, options = []) {
  for (let categoryOption of categoriesOptions) {
    options.push({
      value: categoryOption._id,
      name: categoryOption.name,
      parentId: categoryOption.parentId,
      pagetype: categoryOption.pagetype
    })

    if (categoryOption.children.length > 0) {
      categoryOptions(categoryOption.children, options)
    }
  }
  return options
}
export default categoryOptions