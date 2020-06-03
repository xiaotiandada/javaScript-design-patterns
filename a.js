function display(x) {
  console.log(x)
  if (x > 5000) {
    console.log(x)

    function divide (x) {
      console.log(x)

      if (x <= 2001) {
        return x
      }

      return divide(x / 2)
    }

    return divide(x / 2)
  }

  return display(x * 2)
}

display(2001)


// 2001 * 1
// 4002 * 2
// 8004 4002 * 2
// 8004 
// 4002 8004 / 2
// 2001 4002 / 2