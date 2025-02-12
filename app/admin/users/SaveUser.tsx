import {Select, Text, TextField} from "@radix-ui/themes";
import {PostUserDto, UserDtoRoleEnum} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";

const defaultUser: PostUserDto = {role: "STUDENT", email: '', password: ''};

export default function SaveUser({selected = defaultUser,
                                   setField,
                                   editMode = false
                                 }: SaveComponentProps<PostUserDto>) {
  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Email</Text>
        <TextField.Root disabled={!editMode} type={"email"} value={selected?.['email'] ?? ''}
                        onChange={event => setField('email', event.target.value)}
                        placeholder="Email"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Password</Text>
        <TextField.Root disabled={!editMode} type={"password"} onChange={event => setField('password', event.target.value)}
                        value={selected?.['password'] ?? ''} placeholder={"********"}/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">First name</Text>
        <TextField.Root disabled={!editMode} type={"text"}
                        value={selected?.['firstName'] ?? ''}
                        onChange={event => setField('firstName', event.target.value)}
                        placeholder="First name"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Last name</Text>
        <TextField.Root disabled={!editMode} type={"text"}
                        value={selected?.['lastName'] ?? ''}
                        onChange={event => setField('lastName', event.target.value)}
                        placeholder="Last name"/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Birth date</Text>
        <TextField.Root disabled={!editMode} type={"date"}
                        value={selected?.['birthDate'] ? selected['birthDate'].toISOString().split('T')[0] : ''}
                        onChange={event => setField('birthDate', new Date(event.target.value))}
                        placeholder="Year"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Role</Text>
        <Select.Root disabled={!editMode} onValueChange={role => setField('role', role as UserDtoRoleEnum)}
                     value={selected?.['role']}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            <Select.Item value="ADMIN">Admin</Select.Item>
            <Select.Item value="TEACHER">Teacher</Select.Item>
            <Select.Item value="STUDENT">Student</Select.Item>
          </Select.Content>
        </Select.Root>
      </label>
    </div>
  </div>
}