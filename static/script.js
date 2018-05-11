var filter = document.getElementsByClassName("filter")
filter[0].addEventListener("click", function() 
{
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
})

function sort(index)
{   
    var direction = handleArrowImgaes(index)
    
    var table = document.getElementById("employees")
    var rowArray = Array.from(table.getElementsByTagName("TBODY")[0].getElementsByTagName("TR"))
    
    var sorted = mergesort(rowArray,index,direction)
    createSortedTable(table, sorted)
}

function updateFilter()
{
    var searchCategory = document.getElementById("searchCategory").value
    var query = document.getElementById("query").value
    var table = document.getElementById("employees")
    var rowArray = Array.from(table.getElementsByTagName("TBODY")[0].getElementsByTagName("TR"))
    var sortedTable = mergesort(rowArray,searchCategory,'ASC')
    
    if (!isNaN(query))
    {
        query = parseInt(query)
    }
    
    var founditem = splitSearch(sortedTable,searchCategory,query)
    if (!founditem) {founditem = rowArray}

    createSearchTable(rowArray, founditem)
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
            else
            {
                var leftValue =  leftSorted[0].getElementsByTagName("TD")[index].innerHTML
                var rightValue = rightSorted[0].getElementsByTagName("TD")[index].innerHTML
                
                if (!isNaN(leftValue))
                {
                    leftValue = parseInt(leftValue)
                } 
                if (!isNaN(rightValue))
                {
                    rightValue = parseInt(rightValue)
                }

                if (leftValue <= rightValue)
                {
                    if (direction == "ASC") {sorted.push(leftSorted.shift())}
                    else {sorted.push(rightSorted.shift())}
                } 
                else {
                    if (direction == "ASC") {sorted.push(rightSorted.shift())}
                    else {sorted.push(leftSorted.shift())}
                }
            }
        }
        return sorted
    }
}

function splitSearch(rows,searchCategory,query)
{
    if (rows.length < 1) {return}
    var row = rows[((rows.length/2) | 0)]
    var focusedItem = row.getElementsByTagName("TD")[searchCategory].innerHTML
    if (!isNaN(focusedItem))
    {
        focusedItem = parseInt(focusedItem)
    }
    if (query == focusedItem && rows.length > 1)
    {
        var result = [row]
        var leftHalf = rows.slice(0,(rows.length/2) | 0)
        var leftResult = splitSearch(leftHalf,searchCategory,query)
    
        var rightHalf = rows.slice(((rows.length/2) | 0) + 1)
        var rightResult = splitSearch(rightHalf,searchCategory,query)
    
        if (leftResult) {result = result.concat(leftResult)}
        if (rightResult) {result = result.concat(rightResult)}
    
        return result
    }
    else if (query == focusedItem)
    {
        return [row]
    }
    else if (rows.length <= 1)
    {
        return
    }
    else if (query < focusedItem)
    {
        var leftHalf = rows.slice(0,(rows.length/2) | 0)
        return splitSearch(leftHalf,searchCategory,query)
    }
    else if (query > focusedItem)
    {
        var rightHalf = rows.slice((rows.length/2) | 0)
        return splitSearch(rightHalf,searchCategory,query)
    }
    else
    {
        console.log("Confused")
    }
}

function createSortedTable(table, tableData) {
    var tableBody = document.createElement('tbody')
  
    tableData.forEach(function(row) 
    {
      tableBody.appendChild(row)
    })
  
    table.replaceChild(tableBody, table.getElementsByTagName("TBODY")[0])
}

function createSearchTable(rows, tableData)
{
    rows.forEach(function(row)
    {
        if (tableData.indexOf(row) > -1) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    })
}
