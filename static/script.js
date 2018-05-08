function sort(index)
{   
    var direction = handleArrowImgaes(index)
    var table, rows
    table = document.getElementById("employees")
    rows = table.getElementsByTagName("TBODY")[0].getElementsByTagName("TR")
    var rowArray = Array.from(rows)
    var sorted = mergesort(rowArray,index,direction)
    createTable(table, sorted)
}

function handleArrowImgaes(index)
{
    var direction
    for (let i=0; i<8; i++)
    {
        if (i == index && document.getElementById(`arrow${index}`).src == 'http://127.0.0.1:5000/static/down-arrow-red.svg')
        {
            document.getElementById(`arrow${index}`).src = 'static/up-arrow-red.svg'
            direction = "DESC"
        } else if (i == index ) 
        {
            document.getElementById(`arrow${index}`).src = 'static/down-arrow-red.svg'
            direction = "ASC"
        } else 
        {
            document.getElementById(`arrow${i}`).src = 'static/down-arrow.svg'
        }
    }
    return direction
}

function mergesort(rows,index,direction)
{
    if (rows.length < 2)
    {
        return rows
    }
    else 
    {
        var rowLen = rows.length
        var leftHalf = rows.slice(0,(rowLen/2) | 0)
        var leftSorted = mergesort(leftHalf,index,direction)
        var rightHalf = rows.slice((rowLen/2) | 0)
        var rightSorted = mergesort(rightHalf,index,direction)
        var sorted = []
        while (leftSorted.length > 0 || rightSorted.length > 0)
        {
            if (leftSorted[0] == undefined) 
            {
                sorted.push(rightSorted.shift())
            } 
            else if (rightSorted[0] == undefined) 
            {
                sorted.push(leftSorted.shift())
            } 
            else if (leftSorted[0].getElementsByTagName("TD")[index].innerHTML <= rightSorted[0].getElementsByTagName("TD")[index].innerHTML)
            {
                if (direction == "ASC") {sorted.push(leftSorted.shift())}
                else {sorted.push(rightSorted.shift())}
            } 
            else {
                if (direction == "ASC") {sorted.push(rightSorted.shift())}
                else {sorted.push(leftSorted.shift())}
            }
        }
        return sorted
    }
}

function createTable(table, tableData) {
    var tableBody = document.createElement('tbody')
  
    tableData.forEach(function(row) 
    {
      tableBody.appendChild(row)
    })
  
    table.replaceChild(tableBody, table.getElementsByTagName("TBODY")[0])
  }