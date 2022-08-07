// Tip #6: type helpers
import React from 'react'
const MyComponent = (props: {enabled: boolean}) => {
  return null
}

class MyOtherComponent extends React.Component<{
enabled: boolean
}> {}

type PropsFrom<TComponent> = TComponent extends React.FC<infer Props> 
  ? Props : TComponent extends React.Component<infer props> ? props : never;

const props: PropsFrom<MyOtherComponent> = {
  enabled: true
}
