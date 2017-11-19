
function removeActive(){
    $("#SelectTools").removeClass("active");
    $('#EraserTools').removeClass('active');
    $("#TextTools").removeClass("active");
    $('#SelectColors').removeClass('active');
    $("#SelectImage").removeClass("active");
    $('#PdfImage').removeClass('active');
    $("#SaveImage").removeClass("active");
    $('#PANImage').removeClass('active');
    }
    

function removeToolActive(){
    $("#PANImage1").removeClass("active");
    $('#CircleImage').removeClass('active');
    $("#PointImage").removeClass("active");
    $('#UndoImage').removeClass('active');
    $("#DeleteImage").removeClass("active");
}


function removeAddClass(){
    removeActive();
    $("#ColorsDiv").addClass("hide");
    $('#ToolsDiv').addClass('hide');
    $('#SizeDiv').addClass("hide");
    $('#TextDiv').addClass("hide");
    $("#ToolsDiv").removeClass("show");
    $('#ColorsDiv').removeClass('show');
    $('#SizeEraserDiv').removeClass('show');
    $('#SizeDiv').removeClass('show');
}

function removeClasses(){
        removeActive();
        //$('#SizeDiv').removeClass('show');
        $('#SizeEraserDiv').removeClass('show');
        $("#ToolsDiv").removeClass("show");
        $('#ColorsDiv').removeClass('show');
        $('#TextDiv').removeClass('show');
        
}


var mode = 'brush';
var strokeSize = 10;
var strokeColor = '#cccccc';
var fontSize = 12;

if(!sessionId) {
  var sessionId = 'TEMP';
}

$(document).ready(function() {

    /*Select tools scripting*/

    $('#SelectTools').click(function(){
        
        removeClasses();
        
        /*var check = $("#SizeDiv").hasClass('show');
        //alert(check); 
        if(check === true){
            $('#SizeDiv').removeClass('show');
            $('#SizeDiv').removeClass('hide');
        }*/
        $(this).addClass('active');
        $('#SizeDiv').toggleClass("show");
        $('#TextDiv').addClass("hide");

        mode = 'brush';
        
    });
    $('#EraserTools').click(function(){
        removeActive();
        $(this).addClass('active');
        $('#SizeEraserDiv').toggleClass("show");
        $('#TextDiv').addClass("hide");
        $("#ToolsDiv").removeClass("show");
        $('#ColorsDiv').removeClass('show');
        $('#TextDiv').removeClass('show');
        $('#SizeDiv').removeClass('show');

        mode = 'eraser';
    });

    $('#TextTools').click(function(){
        
        removeActive();
        $(this).addClass('active');
        $('#TextDiv').toggleClass("show");
        $('#SizeDiv').addClass("hide");
        $("#ToolsDiv").removeClass("show");
        $('#ColorsDiv').removeClass('show');
        $('#SizeEraserDiv').removeClass('show');
        $('#SizeDiv').removeClass('show');
        
        mode = 'text';
    });

    $('#SelectColors').click( function() {
        removeActive();
        $(this).addClass('active');
        $("#ColorsDiv").toggleClass("show");
        $('#ToolsDiv').removeClass('show');
        $('#TextDiv').removeClass('show');
        $('#SizeEraserDiv').removeClass('show');
        $('#SizeDiv').removeClass('show');
        $('#SizeDiv').addClass("hide");
        $('#TextDiv').addClass("hide");
    });

    $('#SelectImage').click(function(){
        removeAddClass();
        $(this).addClass('active');

    });
    $('#PdfImage').click(function(){
        removeAddClass();
        $(this).addClass('active');
    });
    $('#SaveImage').click(function(){
        removeAddClass();
        $(this).addClass('active');
        
        downloadCanvas($(this).find('a')[0], 'canvas', 'test-'+ sessionId +'.png');
    });


        $('#PANImage').click(function() {
            removeActive();
        $(this).addClass('active');
        $("#ToolsDiv").toggleClass("show");
        $('#SizeDiv').addClass("hide");
        $('#TextDiv').addClass("hide");
        $('#ColorsDiv').removeClass('show');
        $('#TextDiv').removeClass('show');
        $('#SizeEraserDiv').removeClass('show');
        $('#SizeDiv').removeClass('show');
    });

    /*Selecting Extra tools function*/

    function removeTools(){
        removeToolActive();
        $('#PANIcon').removeClass();
        $("#ToolsDiv").removeClass("show");
        $("#SizeDiv").addClass("hide");
        $('#TextDiv').addClass("hide");
    }

    $('#PANImage1').click(function(){
        removeTools();
        $(this).addClass('active');
        $('#PANIcon').addClass("fa fa-hand-paper-o iconSize");
        
    });

    $('#CircleImage').click(function(){
        removeTools();
        $(this).addClass('active');
        $('#PANIcon').addClass("fa fa-circle-thin iconSize");
    });
    $('#PointImage').click(function(){
        removeTools();
        $(this).addClass('active');
        
        $('#PANIcon').addClass("fa fa-crosshairs iconSize");
        
    });
    $('#DeleteImage').click(function(){
        removeTools();
        $(this).addClass('active');
        
        $('#PANIcon').addClass("fa fa-trash-o iconSize");
        
    });
    $('#UndoImage').click(function(){
        removeTools();
        $(this).addClass('active');
        
        $('#PANIcon').addClass("fa fa-repeat iconSize");
        
    });

    /*End Extra tools function*/
    
/*End Select tools scripting*/

/*Select size scripting*/
function removeSizeActive(){
    $("#Image12").removeClass("active");
    $('#Image16').removeClass('active');
    $("#Image20").removeClass("active");
    $('#Image24').removeClass('active');
    $("#Image28").removeClass("active");
    $('#Image32').removeClass('active');
}
function removeSizeClass(){
    removeSizeActive();
    $('#SizeDiv').addClass("hide");
    $("#SizeDiv").removeClass("show");
}

    $('#Image12').click(function(){
        removeSizeClass();
        $(this).addClass('active');
        strokeSize = 12;
    });
    $('#Image16').click(function(){
            removeSizeClass();
        $(this).addClass('active');
        
        strokeSize = 16;
    });
    $('#Image20').click(function(){
        
        removeSizeClass();
        $(this).addClass('active');
        
        strokeSize = 20;
    });
    $('#Image24').click(function(){
        
        removeSizeClass();
        $(this).addClass('active');
        
        strokeSize = 24;
    });
    $('#Image28').click(function(){
        
        removeSizeClass();
        $(this).addClass('active');
        
        strokeSize = 28;
    });
    $('#Image32').click(function(){
        
        removeSizeClass();
        $(this).addClass('active');
        
        strokeSize = 32;
    });
    /*End size scripting*/

    /*Select size scripting*/

    function removeEraserSizeActive(){
        $("#Eraser12").removeClass("active");
        $('#Eraser16').removeClass('active');
        $("#Eraser20").removeClass("active");
        $('#Eraser24').removeClass('active');
        $("#Eraser28").removeClass("active");
        $('#Eraser32').removeClass('active');
    }
    function removeEraserClass(){
        removeEraserSizeActive();
        $('#SizeEraserDiv').addClass("hide");
        $("#SizeEraserDiv").removeClass("show");
    }

    $('#Eraser12').click(function(){
        
        removeEraserClass();
        $(this).addClass('active');

        strokeSize = 12;
        
    });
    $('#Eraser16').click(function(){
        
        removeEraserClass();  
        $(this).addClass('active');
        
        strokeSize = 16;
    });
    $('#Eraser20').click(function(){
        
            removeEraserClass();  
        $(this).addClass('active');
        
        strokeSize = 20;
    });
    $('#Eraser24').click(function(){
        
        removeEraserClass();  
        $(this).addClass('active');
        
        strokeSize = 24;
    });
    $('#Eraser28').click(function(){
        
        removeEraserClass();  
        $(this).addClass('active');
        
        strokeSize = 28;
    });
    $('#Eraser32').click(function(){
        
        removeEraserClass();  
        $(this).addClass('active');
        
        strokeSize = 32;
    });
    /*End size scripting*/

    /*Select Text scripting*/

        function removeSizeTextActive(){
            
            $("#Size12").removeClass("active");
            $('#Size16').removeClass('active');
            $("#Size20").removeClass("active");
            $('#Size24').removeClass('active');
            $("#Size28").removeClass("active");
            $('#Size32').removeClass('active');
        }
        function removeTextClass(){
            $('#TextDiv').addClass("hide");
        $("#TextDiv").removeClass("show");
        }
        function text(){
            removeSizeTextActive();
            removeTextClass();
        }

    $('#Size12').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 12;
    });
    $('#Size16').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 16;
    });
    $('#Size20').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 20;
    });
    $('#Size24').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 24;
    });
    $('#Size28').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 28;
    });
    $('#Size32').click(function(){
        text();
        $(this).addClass('active');
        fontSize = 32;
    });
    /*End Text scripting*/
    /*Select Color scripting*/

    function removeColorActive(){
    $("#BlackColor").removeClass("active-border");
    $('#RedColor').removeClass('active-border');
    $("#GreenColor").removeClass("active-border");
    $('#BlueColor').removeClass('active-border');
    $("#YellowColor").removeClass("active-border");
    $('#PurpleColor').removeClass('active-border');
    $("#PinkColor").removeClass("active-border");
    $('#BrownColor').removeClass('active-border');
    $('#OrangeColor').removeClass('active-border');
}

function removeColorClass(){
    $('#SelectColors').removeClass();
    $("#ColorsDiv").removeClass("show");
}
function colors(){
    removeColorActive();
    removeColorClass();
}

    $('#BlackColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle black");
        mode = 'brush';
        strokeColor = '#000';
    });
    $('#RedColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle red");
        mode = 'brush';
        strokeColor = '#f44336';
    });
    $('#GreenColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle green");
        mode = 'brush';
        strokeColor = '#4caf50';
    });
    $('#BlueColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle blue");
        mode = 'brush';
        strokeColor = '#2196f3';
    });
    $('#YellowColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle yellow");
        mode = 'brush';
        strokeColor = '#ffc107';
    });
    $('#PurpleColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle purple");
        mode = 'brush';
        strokeColor = '#9c27b0';
    });
    $('#PinkColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle pink");
        mode = 'brush';
        strokeColor = '#e91e63';
    });
    $('#BrownColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle brown");
        mode = 'brush';
        strokeColor = '#795548';
    });
    $('#OrangeColor').click(function(){
        colors();
        $(this).addClass('active-border');
        $('#SelectColors').addClass("liStyle orange");
        mode = 'brush';
        strokeColor = '#ff9900';
    });

    function downloadCanvas(link, canvasId, filename) {
      var can = document.getElementsByTagName("canvas");
      var image = can[0].toDataURL("image/png");
      link.href = image;
      link.download = filename;
    }

    /*End Color scripting*/
});