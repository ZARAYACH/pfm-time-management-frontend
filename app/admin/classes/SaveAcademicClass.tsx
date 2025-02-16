import {Select, Text} from "@radix-ui/themes";
import {AcademicClassDto, CourseDto, GroupDto, SemesterDto, UserDto} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";


interface SaveAcademicClassProps extends SaveComponentProps<AcademicClassDto> {
  teachers: UserDto[];
  groups: GroupDto[];
  semesters: SemesterDto[];
  courses: CourseDto[];
}

export default function SaveAcademicClass({
                                            selected,
                                            setField,
                                            teachers = [],
                                            groups = [],
                                            courses = [],
                                            semesters = []
                                          }: SaveAcademicClassProps) {

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">AcademicClass teacher</Text>
        <Select.Root onValueChange={id => setField('teacherId', Number(id))}
                     value={String(selected?.['teacherId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {teachers && teachers.map((teacher, index) => <Select.Item key={index}
                                                                       value={String(teacher.id)}>{teacher.email}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Course</Text>
        <Select.Root onValueChange={id => setField('courseId', Number(id))}
                     value={String(selected?.['courseId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {courses && courses.map((course, index) => <Select.Item key={index}
                                                                    value={String(course.id)}>{course.name}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Student group</Text>
        <Select.Root onValueChange={id => setField('groupId', Number(id))}
                     value={String(selected?.['groupId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {groups && groups.map((group, index) => <Select.Item key={index}
                                                                 value={String(group.id)}>{group.name}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Semester</Text>
        <Select.Root onValueChange={id => setField('semesterId', Number(id))}
                     value={String(selected?.['semesterId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {semesters && semesters.map((semester, index) => <Select.Item key={index}
                                                                          value={String(semester.id)}>{semester.year + ' ' + semester.type}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
    </div>
  </div>
}