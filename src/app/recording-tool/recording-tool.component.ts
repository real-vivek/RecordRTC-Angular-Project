import { Component, OnInit } from '@angular/core';
import { RecordMicService } from '../record-mic.service';
import * as RecordRTC from 'recordrtc';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-recording-tool',
  templateUrl: './recording-tool.component.html',
  styleUrls: ['./recording-tool.component.css']
})
export class RecordingToolComponent implements OnInit {

  mic_audio;
  blobMicUrl;
  speaker_audio;
  constructor(private mic_record:RecordMicService,private sanatizer:DomSanitizer) { }

  ngOnInit() {
  }

  async startRecording(){
    let mediaDeviceObj=navigator.mediaDevices as any;
    let micStream=await mediaDeviceObj.getUserMedia({audio:true});
    let speakerStream=await mediaDeviceObj.getDisplayMedia({video:true,audio:true});
    this.mic_audio=new RecordRTC.StereoAudioRecorder(micStream,{audio:true});
    this.speaker_audio=new RecordRTC.StereoAudioRecorder(speakerStream,{audio:true});
    this.mic_audio.record();
    console.log('Mic Reccording Started')
    this.speaker_audio.record();
    console.log('Speaker Reccording Started')
  }

  stopRecording(){
    this.mic_audio.stop(blob=>{
      console.log(blob);
      this.blobMicUrl=this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      // this.blobTofile(blob,"testAudioMic");
      this.createAudioElement(blob);
      console.log('Mic Recording Stopped')
    });
    
    this.speaker_audio.stop(blob=>{
      console.log(blob);
      this.blobMicUrl=this.sanatizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      // this.blobTofile(blob,"testAudioMic");
      this.createAudioElement(blob);
      console.log('Mic Recording Stopped')
    });
  }
  
  blobTofile(blob:Blob,fileName){
    console.log('Inside blob to File conversion')
    let b:any=(blob);
    b.lastModified=new Date();
    b.name=fileName;
    let auiodMicFile:File=<File>blob;
    console.log(auiodMicFile);
    return auiodMicFile;
  }
  // Code for creating Audio Element
  createAudioElement(blobMic:Blob){
    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');
    const deleteButton = document.createElement('button');
    const articleMain=document.querySelector('article');
 // clipContainer.classList.add('clip');
 audio.setAttribute('controls', '');
 deleteButton.innerHTML = "Delete";
//  clipLabel.innerHTML = clipName;
 clipContainer.appendChild(audio);
 clipContainer.appendChild(clipLabel);
 clipContainer.appendChild(deleteButton);
 articleMain.appendChild(clipContainer);
 const blob = blobMic;
 const audioURL = window.URL.createObjectURL(blob);
 audio.src = audioURL;

//  Delete button functionality
 deleteButton.onclick = function(e) {
  let evtTgt = e.target;
  (evtTgt as Element).parentNode.parentNode.removeChild((evtTgt as Element).parentNode);
}
}
  
}
