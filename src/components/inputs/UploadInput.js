import { Icon, Image } from '../presentation'
import { Link } from '../actions'
import { LinkInput } from './LinkInput'
import { Loading } from '../state'
import { Text } from '../text'
import { Upload } from './upload/Upload'
import { View } from '../structure'

function ImageOrIcon({ value, ...props }) {
  const isImage = value.type?.startsWith('image/')
  if (!isImage) {
    return (
      <View {...props} bg="text4_op10" center>
        <Icon name="file-line" />
      </View>
    )
  }
  return <Image src={value?.uri || value?.url} {...props} />
}

function DocLine({ value, remove, ...props }) {
  const isDone = !value?.status || value?.status !== 'uploading'
  const loading = value?.status === 'uploading'
  const hasError = value?.status === 'error'

  return (
    <View row gap="sm" centerV border br="md" paddingR="md">
      <ImageOrIcon value={value} width={50} height={50} br="md" />
      <Text label={value.name} flex />
      {hasError && <Text label="Error" sm red />}
      {loading && <Loading />}
      {isDone && (
        <Link onPress={() => remove(value)} padding="xs">
          <Icon name="delete-bin-2-line" red xs />
        </Link>
      )}
    </View>
  )
}

function AreaInput({ placeholder, isDragging, ...props }) {
  return (
    <Link
      center
      gap="sm"
      border
      borderStyle="dashed"
      padding="md"
      minH={160}
      br="md"
      bg={isDragging ? 'primary_op10' : 'transparent'}
      {...props}
    >
      <Icon name="upload-cloud-2-line" />
      <Text label={placeholder} text4 center />
    </Link>
  )
}

function Inputs({ value, open, remove, isDragging, multiple, area, ...props }) {
  const placeholder = 'Upload file'
  let link = <LinkInput onPress={open} prefixIcon="upload-cloud-2-line" placeholder={placeholder} {...props} />
  if (area) link = <AreaInput onPress={open} placeholder={placeholder} {...props} />

  if (!!multiple && value?.length)
    return (
      <View gap="xs">
        {link}
        {value.map((item, i) => (
          <DocLine key={i} value={item} remove={remove} />
        ))}
      </View>
    )
  if (!multiple && !!value) {
    return <DocLine value={value} remove={remove} />
  }
  return link
}

export function UploadInput({ ...props }) {
  return <Upload {...props}>{(params) => <Inputs {...props} {...params} />}</Upload>
}
