// Get the Filter DOM Element and create Onclick event which toggles the display value
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
    // Update Arrow Images in Table
    var direction = handleArrowImgaes(index)
    
    // Get all rows 
    var table = document.getElementById("employees")
    var rowArray = Array.from(table.getElementsByTagName("TBODY")[0].getElementsByTagName("TR"))
    
    // Sort all rows and update Table
    var sorted = mergesort(rowArray,index,direction)
    createSortedTable(table, sorted)
}

function updateFilter()
{
    // Get the Category in which will be searched and the query
    var searchCategory = document.getElementById("searchCategory").value
    var query = document.getElementById("query").value

    // Get all rows
    var table = document.getElementById("employees")
    var rowArray = Array.from(table.getElementsByTagName("TBODY")[0].getElementsByTagName("TR"))
    
    // Sort the Table in Ascending order
    var sortedTable = mergesort(rowArray,searchCategory,'ASC')
    
    // Search for the query in the previous sorted Table
    var founditem = splitSearch(sortedTable,searchCategory,query,0,sortedTable.length)
    
    // If no Item was found, display the whole table again
    if (!founditem) {founditem = rowArray}

    // update the table with the found item
    createSearchTable(rowArray, founditem)
}

function handleArrowImgaes(index)
{
    var direction
    for (let i=0; i<8; i++)
    {
        // if the previous arrow pointed downwards and this index got clicked -> change Arrow to upwards and set direction
        if (i == index && document.getElementById(`arrow${index}`).src == 'http://127.0.0.1:5000/static/down-arrow-red.svg')
        {
            document.getElementById(`arrow${index}`).src = 'static/up-arrow-red.svg'
            direction = "DESC"
        } 
        // if just the index matches -> change Arrow to downwards and set direction
        else if (i == index ) 
        {
            document.getElementById(`arrow${index}`).src = 'static/down-arrow-red.svg'
            direction = "ASC"
        } 
        // Set all other arrows to normal and downwars
        else 
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
        // return item if the list contains just one item and is therefore sorted
        return rows
    }
    else 
    {
        // get length of rows
        var rowLen = rows.length
        
        // slice rows into left and righ half and sort both halves
        var leftHalf = rows.slice(0,(rowLen/2) | 0)
        var leftSorted = mergesort(leftHalf,index,direction)
        var rightHalf = rows.slice((rowLen/2) | 0)
        var rightSorted = mergesort(rightHalf,index,direction)
        
        // initialize sorted array
        var sorted = []

        // do while there are still some items in one of the halves
        while (leftSorted.length > 0 || rightSorted.length > 0)
        {
            // if left half is empty -> push right item into sorted array
            if (leftSorted[0] == undefined) 
            {
                sorted.push(rightSorted.shift())
            } 
            // if right half is empty -> push left item into sorted array
            else if (rightSorted[0] == undefined) 
            {
                sorted.push(leftSorted.shift())
            }
            else
            {
                // Get the value of the searched category of the rows
                var leftValue =  leftSorted[0].getElementsByTagName("TD")[index].innerHTML
                var rightValue = rightSorted[0].getElementsByTagName("TD")[index].innerHTML
                
                if (compare(leftValue,rightValue,index) <= 0)
                {
                    // if leftValue < rightValue and direction ascending -> push leftitem ELSE push rightitem
                    if (direction == "ASC") {sorted.push(leftSorted.shift())}
                    else {sorted.push(rightSorted.shift())}
                } 
                else 
                {
                    // if rightValue < leftValue and direction ascending -> push rightitem ELSE push leftitem
                    if (direction == "ASC") {sorted.push(rightSorted.shift())}
                    else {sorted.push(leftSorted.shift())}
                }
            }
        }
        return sorted
    }
}

//Binary Search based on indexes
function splitSearch(rows,searchCategory,query,low,high)
{
    // if low bound index > upper bound index
    if (low > high)
    {
        return
    }

    // calculate new mid index and get new focused row based on that index
    var mid = (low + high)/2 | 0 
    var focusedItem = rows[mid].getElementsByTagName("TD")[searchCategory].innerHTML

    if (compare(query,focusedItem,searchCategory) == 0)
    {
        // REMOVE THE FOLLOWING LINE TO GET THE NORMAL BINARY SEARCH
        //return [rows[mid]]
        
        // COMMENT THE FOLLOWING 3 LINES TO GET THE NORMAL BINARY SEARCH
        var result = [rows[mid]]                                                    // This is my modified version where the binary search finds all items and doesnt stop   
        result = result.concat(splitSearch(rows,searchCategory,query,low,mid-1))    // Append the current item, the results of the leftHalf and the results of the rightHalf
        result = result.concat(splitSearch(rows,searchCategory,query,mid+1,high))   

        return result
    }
    else if (compare(query,focusedItem,searchCategory) == -1)
    {
        // if query < the current focusedItem -> set the higher bound index lower and search in that part again
        high = mid - 1
        return splitSearch(rows,searchCategory,query,low,high)
    } 
    else 
    {
        // if query > the current focusedItem -> set the lower bound index higher and search in that part again
        low = mid + 1
        return splitSearch(rows,searchCategory,query,low,high)
    }
}

// Custom Compare Function which can handle all relevant datatype: number, string and dates
function compare(a,b,index)
{
    if (index == 3)
    {
        // index 3 means date column
        // convert to dates and get date time since 1.1.1970 to be able to compare it
        a = new Date(a).getTime()
        b = new Date(b).getTime()
    }
    else if (index == 0 || index == 4 || index == 6)
    {   
        // index 0,4 or 6 means integer column
        // convert to integers
        a = parseInt(a)
        b = parseInt(b)
    } 
    // return 1 when a > b, 0 when a = b, -1 when a < b
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
    // create new table body object
    var tableBody = document.createElement('tbody')
  
    // append each row of the sorted array to the new body DOM object
    tableData.forEach(function(row) 
    {
      tableBody.appendChild(row)
    })
  
    // replace old tableBody with new sorted tableBody
    table.replaceChild(tableBody, table.getElementsByTagName("TBODY")[0])
}

function createSearchTable(rows, tableData)
{
    // iterate over each row in the table DOM Object
    rows.forEach(function(row)
    {
        // if the current focused row is in the array of elements that match the filter then display them
        if (tableData.indexOf(row) > -1) {
            row.style.display = "";
        } 
        // if the current focused row is not in the array of elements that match the filter then hide them
        else 
        {
            row.style.display = "none";
        }
    })
}
