
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, File, FileAudio, FileVideo, FilePlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

interface FileUploaderProps {
  onUploadComplete: (fileUrl: string, fileType: string, fileSize: number) => void;
  bucket?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
}

export function FileUploader({
  onUploadComplete,
  bucket = "media-files",
  acceptedFileTypes = "audio/*,video/*,application/pdf",
  maxSizeMB = 100
}: FileUploaderProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    
    if (!selectedFile) return;
    
    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds the maximum allowed size (${maxSizeMB}MB)`);
      return;
    }
    
    setFile(selectedFile);
  };

  const getFileIcon = () => {
    if (!file) return <FilePlus className="w-8 h-8 text-muted-foreground" />;
    
    if (file.type.startsWith("audio/")) {
      return <FileAudio className="w-8 h-8 text-blue-500" />;
    } else if (file.type.startsWith("video/")) {
      return <FileVideo className="w-8 h-8 text-purple-500" />;
    } else {
      return <File className="w-8 h-8 text-orange-500" />;
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    
    try {
      setUploading(true);
      setProgress(0);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        });
      
      if (error) {
        throw error;
      }
      
      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);
      
      // Call the callback with file details
      onUploadComplete(publicUrl, file.type, file.size);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
      
      // Reset the file state
      setFile(null);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setError(error.message || 'An error occurred while uploading the file');
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || 'An error occurred while uploading the file',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${error ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-gray-300 hover:border-primary"}`}
        onClick={() => !file && document.getElementById('fileInput')?.click()}
      >
        <input
          id="fileInput"
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {!file ? (
          <div className="text-center space-y-2">
            <UploadCloud className="w-10 h-10 mb-2 text-muted-foreground mx-auto" />
            <div className="font-medium">Drag or click to upload a file</div>
            <p className="text-sm text-muted-foreground">
              {acceptedFileTypes.split(',').join(', ')} (Max: {maxSizeMB}MB)
            </p>
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileIcon()}
                <div className="overflow-hidden">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2 w-full" />
                <p className="text-sm text-center text-muted-foreground">
                  {progress}% uploaded
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      
      {file && !uploading && (
        <Button 
          onClick={uploadFile} 
          className="w-full"
        >
          Upload File
        </Button>
      )}
    </div>
  );
}
