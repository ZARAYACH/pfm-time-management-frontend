import {Text, TextField} from "@radix-ui/themes";
import {GroupDto, UserDto} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";
import {MultiSelect} from "react-multi-select-component";

const defaultGroup: GroupDto = {id: 0};

interface SaveGroupProps extends SaveComponentProps<GroupDto> {
  users: UserDto[];
}

export default function SaveGroup({
                                    selected = defaultGroup,
                                    setField,
                                    editMode = false,
                                    users = []
                                  }: SaveGroupProps) {

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Name</Text>
        <TextField.Root disabled={!editMode} type={"text"} value={selected?.['name'] ?? ''}
                        onChange={event => setField('name', event.target.value)}
                        placeholder="Name"/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-full ">
        <Text as="div" size="2" mb="1" weight="bold">Students</Text>
        <MultiSelect
          options={users.map(user => ({label: user.email, value: String(user.id)}))}
          value={selected?.studentIds ? Array.from(selected?.studentIds).map(userid => ({
            label: users.find(value => value.id == userid)?.email ?? '',
            value: String(userid)
          })) : []}
          onChange={(value: { label: string, value: string }[]) => {
            setField("studentIds", new Set(value.map(option => Number(option.value))));
          }}
          labelledBy="Select"
        />
        <div className="mt-4">
          <Text as="div" size="2" mb="1" weight="bold">Selected users :</Text>
          <ul className="list-disc list-inside">
            {selected?.studentIds && Array.from(selected?.studentIds).map(value => String(value)).map((userId) => (
              <li key={userId}>{users.find(value => String(value.id) == userId)?.email}</li>
            ))}
          </ul>
        </div>
      </label>
    </div>
  </div>
}