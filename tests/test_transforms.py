from PIL import Image

from src.data.transforms import get_train_transforms

img = Image.new("RGB", (300, 300))

transform = get_train_transforms()

output = transform(img)

print(output.shape)