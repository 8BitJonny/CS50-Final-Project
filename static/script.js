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
    
    var founditem = splitSearch(sortedTable,searchCategory,query,0,sortedTable.length)
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
                
                if (compare(leftValue,rightValue,index) <= 0)
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

function splitSearch(rows,searchCategory,query,low,high)
{
    if (low > high)
    {
        return
    }

    var mid = (low + high)/2 | 0 
    var focusedItem = rows[mid].getElementsByTagName("TD")[searchCategory].innerHTML

    if (compare(query,focusedItem,searchCategory) == 0)
    {
        //return [rows[mid]]
        var result = [rows[mid]]
        result = result.concat(splitSearch(rows,searchCategory,query,low,mid-1))
        result = result.concat(splitSearch(rows,searchCategory,query,mid+1,high))
        console.log(result)
        return result
    }
    else if (compare(query,focusedItem,searchCategory) == -1)
    {
        high = mid - 1
        return splitSearch(rows,searchCategory,query,low,high)
    } 
    else 
    {
        low = mid + 1
        return splitSearch(rows,searchCategory,query,low,high)
    }
}

function compare(a,b,index)
{
    if (index == 3)
    {
        a = new Date(a).getTime()
        b = new Date(b).getTime()
    }
    else if (index == 0 || index == 4 || index == 6)
    {
        a = parseInt(a)
        b = parseInt(b)
    } 
    if (a > b)
    {
        return 1
    } 
    else if (a < b)
    {
        return -1
    } 
    else
    {
        return 0
    }

}

function createSortedTable(table, tableData)
{
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
