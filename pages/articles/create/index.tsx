import { Accordion, Loader, Box, Button, Center, Container, Grid, Group, Paper, MultiSelect, Stack, Text, TextInput, Textarea, useMantineTheme, Title } from '@mantine/core';
import React, { useState } from 'react'
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconAlertTriangle, IconCode, IconFile, IconFileText, IconHeading, IconLetterT, IconPhoto, IconPlayerPlay, IconPlus, IconWriting } from '@tabler/icons';
import { getTheme, makeRequestOne } from '../../../config/config';
import { EMOJIS, PRISM_LANGUAGES, URLS } from '../../../config/constants';
import HeaderAndFooterWrapper from '../../../layouts/HeaderAndFooterWrapper';
import { modals } from '@mantine/modals';
import { CallToActionButtonAction } from '../../../components/cta/CallToActionButton';
import dynamic from 'next/dynamic';
import { useForm } from '@mantine/form';
import MyJSONDataForm from '../../../components/MyCustomForm/MyJSONDataForm';
import requireAdminMiddleware from '../../../middleware/requireAdminMiddleware';
import { useAppContext } from '../../../providers/appProvider';
import { displayErrors } from '../../../config/functions';
import AdminWrapper from '../../../layouts/AdminWrapper';

const Media = dynamic(() => import('../../../components/media/Media'), {
  loading: () => <p>Loading...</p>,
})

export const ELEMENTTYPES: any = {
  image: {
    fields: [
      {
        label: "Image Url",
        name: "src",
        type: "title",
        required: true,
      },
      {
        label: "Image Alt Text",
        name: "alt",
        type: "title",
        required: true,
      },
      {
        label: "Border Radius",
        name: "radius",
        type: "select",
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        required: false,
      },
    ],
  },
  text: {
    fields: [
      {
        label: "Text Value",
        name: "value",
        type: "text",
        required: true,
      },
    ],
  },
  title: {
    fields: [
      {
        label: "Title Value",
        name: "value",
        type: "title",
        required: true,
      },
      {
        label: "Title Order",
        name: "titleOrder",
        type: "select",
        options: [1, 2, 3, 4, 5, 6],
        required: false,
      },
    ],
  },
  video: {
    fields: [
      {
        label: "Video Url",
        name: "src",
        type: "title",
        required: true,
      },
      {
        label: "Video Title (Not Required)",
        name: "alt",
        type: "title",
        required: false,
      },
      {
        label: "Video Border Radius (Not required)",
        name: "radius",
        type: "select",
        options: ['xs', 'sm', 'md', 'lg', 'xl'],
        required: false,
      }
    ],
  },
  code: {
    fields: [
      {
        label: "Code File Name (Not Required)",
        name: "file",
        type: "title",
        required: false,
      },
      {
        label: "Code Language",
        name: "language",
        type: "select",
        options: PRISM_LANGUAGES,
        required: true,
      },
      {
        label: "Code Value",
        name: "value",
        type: "code",
        required: true,
      },
      {
        label: "Show Line Numbers (Not Required)",
        name: "withLineNumbers",
        type: "checkbox",
        required: false,
      },
      {
        label: "Highlight Lines (Not Required)",
        name: "highlightLines",
        type: "array",
        required: false,
      },
    ],
  },
  codes: {
    fields: [
      {
        label: "Add Multiple Codes to make Tabs",
        name: "codes",
        type: "codes",
        required: true,
      },
    ],
  },
}

const getTypes = () => {
  return Object.keys(ELEMENTTYPES)
}



export const getIcon = (type: string, larger?: boolean) => {
  const sm = 26
  const lg = 42
  if (type === "image") {
    return <IconPhoto stroke={1.5} size={larger ? lg : sm} />
  }
  if (type === "video") {
    return <IconPlayerPlay stroke={1.5} size={larger ? lg : sm} />
  }
  if (type === "text") {
    return <IconLetterT stroke={1.5} size={larger ? lg : sm} />
  }
  if (type === "title") {
    return <IconHeading stroke={1.5} size={larger ? lg : sm} />
  }
  if (type === "code") {
    return <IconCode stroke={1.5} size={larger ? lg : sm} />
  }
  if (type === "codes") {
    return <IconCode stroke={1.5} size={larger ? lg : sm} />
  }
  return <IconPhoto stroke={1.5} size={larger ? lg : sm} />
}

interface ElementButtonProps {
  icon: React.ReactNode
  onClick: React.EventHandler<React.MouseEvent>
  label: string
}

const ElementButton = ({ icon, onClick, label }: ElementButtonProps) => {
  const theme = useMantineTheme()
  return (
    <Paper onClick={onClick} sx={{
      width: "100px",
      height: "100px",
      background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[0],
      cursor: "pointer",
      ":hover": {
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.1)"
      }
    }}>
      <Center className="h-100">
        <Stack spacing="xs" align="center">
          {icon}
          <Text size={14} weight={500}>{label}</Text>
        </Stack>
      </Center>
    </Paper>
  )
}

interface CreateArticleProps {
  updating?: boolean
  article?: any
  categories: any
  tags: any

}

interface RenderElementButtonsProps {
  handleAdd: any
  position: 'before' | 'after'
  target: number
}


export const RenderElementButtons = (props: RenderElementButtonsProps) => {
  const { handleAdd, position, target } = props
  return (
    <Group align="center" spacing="md" my="md" position="center">
      {getTypes().map((type: any, i: any) => {
        return (
          <Button key={`type_${i}`} size="xs" radius="md" leftIcon={<IconPlus stroke={1.5} />} onClick={() => handleAdd(type, position, target)} style={{
            textTransform: 'uppercase',
          }}>{type}</Button>
        )
      })}
    </Group>
  )
}


const CreateArticle = (props: CreateArticleProps) => {

  const { updating, article, tags, categories } = props
  const { token, user_id } = useAppContext()

  const initialOtherDetails = {
    title: updating ? article?.title : "",
    description: updating ? article?.description : "",
    tags: updating ? article?.tags.map((tag: any) => tag?.id?.toString()) : [],
    categories: updating ? article?.categories.map((cat: any) => cat?.id?.toString()) : [],
    image: updating ? article?.image : "",
    image_alt_text: updating ? article?.image_alt_text : "",
    keywords: updating ? article?.keywords : "",
    details: updating ? article?.details : []
  }

  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: initialOtherDetails,
    validate: {
      title: value => value.length < 10 ? "Title must be at least 10 characters long" : null,
      description: value => value.length < 50 ? "Description must be at least 50 characters long" : null,
    }
  })

  const theme = useMantineTheme()


  const mediaPreview = () => {
    return modals.open({
      title: "Media Preview",
      fullScreen: true,
      radius: "lg",
      overlayProps: {
        opacity: 0.8,
        color: theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.dark[2],
        blur: 5,
      },
      children: (
        <>
          <Media />
        </>
      )
    })

  }

  const handleArticleCreate = () => {

    setLoading(true)

    const form_data = form.values
    // Loop through form_data and if the key is tags or categories, loop through the value and convert it back to number
    for (const [key, value] of Object.entries(form_data)) {
      if (key === "tags" || key === "categories") {
        form_data[key] = value.map((item: any) => parseInt(item))
      }
    }
    const data = {
      ...form_data,
      user: user_id,
    }

    let url = URLS.BLOGS + "/"
    let method = 'POST'
    let success_msg = `The article has been created successfully ${EMOJIS['yum']}`
    if (updating) {
      url = URLS.BLOGS + "/" + article.id + "/"
      method = 'PUT'
      success_msg = `The article has been updated successfully ${EMOJIS['yum']}`
    }

    makeRequestOne({
      url: url,
      data: data,
      method: method,
      extra_headers: {
        authorization: `Bearer ${token}`
      },
      useNext: false
    }).then((res: any) => {
      showNotification({
        title: `Success ${EMOJIS['partying']}`,
        message: success_msg,
        color: 'green',
        icon: <IconAlertCircle stroke={1.5} />,
      })
      if (!updating) {
        form.reset()
      }
    }).catch((error) => {
      const errors = error.response.data
      displayErrors(form, errors)
      showNotification({
        title: `Error ${EMOJIS['raised_eyebrow']}`,
        message: "An error occurred. Please try again",
        color: 'red',
        icon: <IconAlertTriangle stroke={1.5} />,
      })
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Container size="xl">
        <div>
          <Stack spacing="sm">
            <Title>Article Information</Title>
            <Group align="center" spacing="md" position="apart" mb="sm">
              <ElementButton label={'Media'} icon={<IconFile stroke={1.5} size={42} />} onClick={mediaPreview} />
            </Group>
          </Stack>
          <Stack spacing="sm">
            <Accordion radius="lg" defaultValue={`detail_0`} sx={{
              background: getTheme(theme) ? theme.colors.dark[5] : theme.colors.gray[0],
            }}>
              <Accordion.Item value={`detail_main_info`}>
                <Accordion.Control icon={<IconFileText stroke={1.5} />}>
                  <Box>
                    Article Main Information
                  </Box>
                </Accordion.Control>
                <Accordion.Panel>
                  <form onSubmit={form.onSubmit((values) => handleArticleCreate())}>
                    <TextInput
                      label="Article Title"
                      withAsterisk
                      {...form.getInputProps('title')}
                    />
                    <Textarea
                      label="Article Description"
                      autosize
                      minRows={4}
                      withAsterisk
                      {...form.getInputProps('description')}
                    />
                    <TextInput
                      label="Article Image Url"
                      {...form.getInputProps('image')}
                    />
                    <TextInput
                      label="Article Image Alt Text"
                      withAsterisk
                      {...form.getInputProps('image_alt_text')} />
                    <MultiSelect
                      label="Article Categories"
                      nothingFound="No categories found, add some"
                      searchable
                      clearable
                      data={categories ? categories?.map((cat: any) => ({ value: cat.id?.toString(), label: cat.title })) : []}
                      {...form.getInputProps('categories')} />
                    <MultiSelect
                      label="Article Tags"
                      nothingFound="No tags found, add some"
                      searchable
                      clearable
                      data={tags ? tags?.map((tag: any) => ({ value: tag.id?.toString(), label: tag.title })) : []}
                      {...form.getInputProps('tags')} />
                    <Textarea
                      label="Article Keywords"
                      autosize
                      minRows={4}
                      withAsterisk
                      {...form.getInputProps('keywords')}
                    />
                  </form>
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value={`details`}>
                <Accordion.Control icon={<IconLetterT />}>
                  <Box>
                    Article details
                  </Box>
                </Accordion.Control>
                <Accordion.Panel>
                  <MyJSONDataForm form={form} fieldPrefix={`details`} />
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Stack>
          <Group mt="md">
            <CallToActionButtonAction label={updating ? 'update Article' : 'Post Article'} icon={updating ? <IconWriting color='white' stroke={1.5} /> : <IconPlus color="white" stroke={1.5} />} action={handleArticleCreate} rightIcon={loading ? <Loader size="sm" color="white" /> : <></>} />
          </Group>
        </div>
      </Container>
    </>
  )
}

export const getServerSideProps = async (context: any) => {
  requireAdminMiddleware(context.req, context.res, () => { })

  // const cookies = context.req.cookies
  // const userDetails_: any = cookies[LOCAL_STORAGE_KEYS.user]
  // const token = cookies[LOCAL_STORAGE_KEYS.token]

  const categoriesQuery = await makeRequestOne(
    {
      url: `${URLS.BLOG_CATEGORIES}`,
      method: "GET",
      params: { limit: 100, fields: 'id,title,slug' }
    }
  )

  const tagsQuery = await makeRequestOne(
    {
      url: `${URLS.BLOG_TAGS}`,
      method: "GET",
      params: { limit: 100, fields: 'id,title,slug' }
    }
  )

  return {
    props: {
      tags: tagsQuery?.data?.results,
      categories: categoriesQuery?.data?.results
    }
  }
}

CreateArticle.PageLayout = AdminWrapper

export default CreateArticle