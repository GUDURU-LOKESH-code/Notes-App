
const searchInput = document.getElementById("searchInput");
const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const emptyMessage = document.getElementById("emptyMessage");


searchInput.addEventListener("input",function() {
        const notes = document.querySelectorAll(".noteStyle");
        let found = false;
        notes.forEach(function(note) {
            let searchText = searchInput.value.toLowerCase();
            let noteContent = note.querySelector("p").innerText.toLowerCase();
            if(noteContent.includes(searchText)) {
                 note.style.display = "block";
                 found = true
            }
           else {
                 
                 note.style.display = "none";
            }
      });
      if(notes.length === 0) {
        emptyMessage.innerText = "No notes yet...";
        emptyMessage.style.display = "block";
      }
      else if(!found) {
        emptyMessage.innerText = "No matching notes found.";
        emptyMessage.style.display = "block";
      }
      else {
        emptyMessage.style.display = "none";
      }
});


function saveNotes() {
    let notes = []
    document.querySelectorAll(".noteStyle").forEach(function(note) {
        notes.push({
            text:note.querySelector("p").innerText
        });
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}


function createNotes(notedata) {
              let noteContainer = document.createElement("div");
              noteContainer.classList.add("noteStyle");

             let noteText = document.createElement("p");
             noteText.innerText = notedata
             noteContainer.appendChild(noteText);


             let deleteBtn = document.createElement("button");
             deleteBtn.innerText = "Delete";
             deleteBtn.classList.add("deletBtnStyle");
             noteContainer.appendChild(deleteBtn);
             deleteBtn.addEventListener("click",function(){
                       noteContainer.remove();
                       saveNotes();
                       const notes = notesContainer.querySelectorAll(".noteStyle");
                       if(notes.length === 0) {
                            emptyMessage.style.display = "block";
                       }
            });

             let editBtn = document.createElement("button");
             editBtn.innerText = "✍️ EDIT";
             editBtn.classList.add("editStyle");
             noteContainer.appendChild(editBtn);
             editBtn.addEventListener("click",function() {
                      let editText = document.createElement("textarea");
                      editText.value = noteText.innerText;
                      noteContainer.replaceChild(editText,noteText);
                       editBtn.style.display = "none";
                      let saveBtn = document.createElement("button")
                      saveBtn.innerText = "💾 Save";
                      saveBtn.classList.add("saveStyle");
                      noteContainer.appendChild(saveBtn);
                      saveBtn.addEventListener("click",function() {
                             let updateText = editText.value.trim();
                             if(updateText === "") {
                                     alert("Note cannot be empty!")
                                     return
                              }
                             noteText.innerText = updateText;
                             noteContainer.replaceChild(noteText,editText);
                             saveNotes();
                             saveBtn.remove();
                             editBtn.style.display = "inline-block";
                     });
             });
           notesContainer.appendChild(noteContainer)
           emptyMessage.style.display = "none";


}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(function(note) {
        createNotes(note.text)
    })
}


addBtn.addEventListener("click",function(){
        let notedata = noteInput.value.trim();
        if(notedata === ""){
              alert("Please Enter text");
              return
        }
        const exists = [...document.querySelectorAll(".noteStyle p")]
        .some(note=>note.innerText === notedata);

        if(exists) {
            alert("Note already exists");
            return;
        }

           createNotes(notedata) 
           saveNotes();
           noteInput.value = "";
           noteInput.focus();
    
})
loadNotes();