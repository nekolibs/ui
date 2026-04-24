import { Icon, Image } from '../presentation'
import { Link } from '../actions'
import { LinkInput } from './LinkInput'
import { Loading } from '../state'
import { Text } from '../text'
import { Upload } from './upload/Upload'
import { View } from '../structure'

function FilePreview({ value, ...props }) {
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

function ListItem({ value, remove, ...props }) {
  const isDone = !value?.status || value?.status !== 'uploading'
  const loading = value?.status === 'uploading'
  const hasError = value?.status === 'error'

  return (
    <View row gap="sm" centerV border br="md" paddingR="md">
      <FilePreview value={value} width={50} height={50} br="md" />
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

function GridItem({ value, remove }) {
  const loading = value?.status === 'uploading'
  const hasError = value?.status === 'error'
  const isDone = !value?.status || value?.status !== 'uploading'

  return (
    <View width={80} height={80} br="md" hiddenOverflow relative>
      <FilePreview value={value} width={80} height={80} br="md" />
      <View absolute top={0} right={0}>
        {loading && (
          <View center bg="backdrop_op70" br="md" padding="xs">
            <Loading sm />
          </View>
        )}
        {hasError && (
          <View center bg="backdrop_op70" br="md" padding="xs">
            <Icon name="error-warning-line" red />
          </View>
        )}
        {isDone && (
          <Link onPress={() => remove(value)} bg="backdrop_op70" padding="xs">
            <Icon name="delete-bin-2-line" xxs red />
          </Link>
        )}
      </View>
    </View>
  )
}

function AddTile({ isDragging, ...props }) {
  return (
    <Link
      center
      width={80}
      height={80}
      border
      borderStyle="dashed"
      br="md"
      bg={isDragging ? 'primary_op10' : 'transparent'}
      {...props}
    >
      <Icon name="add-line" />
    </Link>
  )
}

function DropArea({ placeholder, isDragging, ...props }) {
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

function Content({ value, open, remove, isDragging, multiple, area, grid, maxCount, ...props }) {
  const items = multiple ? value || [] : value ? [value] : []
  const showAdd = multiple ? !maxCount || items.length < maxCount : !value

  if (grid) {
    return (
      <View row wrap gap="sm">
        {items.map((item) => (
          <GridItem key={item._id} value={item} remove={remove} />
        ))}
        {showAdd && <AddTile onPress={open} isDragging={isDragging} />}
      </View>
    )
  }

  const placeholder = 'Upload file'
  const link = area ? (
    <DropArea onPress={open} placeholder={placeholder} isDragging={isDragging} {...props} />
  ) : (
    <LinkInput onPress={open} prefixIcon="upload-cloud-2-line" placeholder={placeholder} {...props} />
  )

  return (
    <View gap="xs">
      {showAdd && link}
      {items.map((item) => (
        <ListItem key={item._id} value={item} remove={remove} />
      ))}
    </View>
  )
}

export function UploadInput({ ...props }) {
  return <Upload {...props}>{(params) => <Content {...props} {...params} />}</Upload>
}
