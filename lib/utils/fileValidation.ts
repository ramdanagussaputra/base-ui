/**
 * Validates a file's extension and MIME type against an accept string.
 * Supports MIME wildcards, specific MIME types, and file extensions.
 */
export function validateFileExtension(file: File, accept: string): boolean {
  if (!accept || accept === "*/*") return true;

  const fileName = file.name.toLowerCase();
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));

  // Handle MIME types like "image/*"
  if (accept.includes("/*")) {
    const mimeType = accept.split("/")[0];
    return file.type.startsWith(mimeType);
  }

  // Handle specific MIME types like "image/jpeg,image/png"
  if (accept.includes("/")) {
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    if (acceptedTypes.includes(file.type)) return true;
  }

  // Handle file extensions like ".jpg,.png,.gif"
  const acceptedExtensions = accept
    .split(",")
    .map((ext) => ext.trim().toLowerCase());
  return acceptedExtensions.some((ext) => {
    // Remove leading dot if present and add it for comparison
    const normalizedExt = ext.startsWith(".") ? ext : `.${ext}`;
    return fileExtension === normalizedExt;
  });
}
