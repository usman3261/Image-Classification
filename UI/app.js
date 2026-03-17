Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        // FIX 1: Point this to your FLASK server (5000), not your LIVE server (5500)
        url: "http://127.0.0.1:5000/classify_image", 
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    // 1. Logic to replace the old file with a new one automatically
    dz.on("addedfile", function() {
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    // 2. Logic to CLEAR the table/results when you click "Remove file"
    dz.on("removedfile", function() {
        $("#resultHolder").hide();
        $("#divClassTable").hide();
        $("#error").hide();
        // Clears all probability scores in the table
        $("td[id^='score_']").html(""); 
        console.log("UI Reset after file removal");
    });
    
   

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        // FIX 2: Ensure the POST request also goes to Port 5000
        var url = "http://127.0.0.1:5000/classify_image";

        $.post(url, {
            image_data: file.dataURL
        }, function(data, status) {
            console.log("Data received:", data);

            if (!data || data.length == 0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
                return;
            }

            // The 'match' is the first person detected in the cropped images list
            let match = data[0]; 
            
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                
                // Show the specific person's card
                $("#resultHolder").html($(`[data-player="${match.class}"]`).html());
                
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let probabilityScore = match.class_probability[index];
                    
                    // FIX 3: Match ID naming (e.g., "BHAGAT SINGH" -> "#score_bhagat")
                    // If your HTML IDs are score_bhagat, score_xi, etc.
                    let elementName = "#score_" + personName.toLowerCase().split(' ')[0];
                    
                    $(elementName).html(probabilityScore);
                }
            }
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();      
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});