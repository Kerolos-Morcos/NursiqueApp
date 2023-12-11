import React, { useState } from 'react';
import { View, Text, Image, StyleSheet  } from 'react-native';
import { Card, IconButton, Avatar } from 'react-native-paper';
import Icon from "@expo/vector-icons/Ionicons";
import { ScrollView } from 'react-native-gesture-handler';

const Articels = () => {
  const [expanded, setExpanded] = useState(false);
  const [arrow, setarrow] = useState(styles.iconButton);

//   const handleExpandClick = () => {
//     if(expanded == false){
//         setExpanded(true);
//     }
//     else{
//         setExpanded(false);
//     }
   
//   };
const handleExpandClick = () => {
    if(expanded == false){
        setExpanded(true);
        setarrow(styles.expandedButton);
            }
            else{
                setExpanded(false);
                setarrow(styles.expandedButton2);
            }
    
  };

  return (
    <ScrollView>
 <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1678310819897-edfe9b9def64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1678310819897-32227df05d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fG1lZGljYWwlMjBjYXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://images.unsplash.com/photo-1615486511369-31ff08672204?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://images.unsplash.com/photo-1584036533827-45bce166ad94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://images.unsplash.com/photo-1576671081837-49000212a370?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://images.unsplash.com/photo-1538333702852-c1b7a2a93001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    <Card style={styles.card}>
      <Card.Title
        title="3 حالات مرضية تتسبب في ارتفاع ضغط الدم"
        subtitle="يوليو 20, 2023"
        style={{width:'100%' , fontWeight:'bold'}}
        left={(props) => <Image source={require('../../assets/medical-care.png')} style={{width: 50 , height:50}} />}
        right={(props) => (
          <IconButton {...props} icon="" onPress={() => {}} />
        )}
      />
      <Image source={{ uri: 'https://plus.unsplash.com/premium_photo-1673034054717-f4a69f2949b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80' }}
        style={{ borderRadius: 0 , width:'100%' , height: 200 }}/>
      <Card.Content>
        <Text style={styles.content}>
        يوجد الكثير من الأسباب التي تؤدي إلى ارتفاع ضغط الدم، منها ما هو متعلق بنمط الحياة إن كان خاملًا أو نشطًا، ونوعية الغذاء الذي يتناوله الشخص، أو العمر والجنس، ومنها ما يتعلق بالحالات الصحية التي يعاني منها المريض.

        </Text>
      </Card.Content>
      <Card.Actions>
        {/* <IconButton
          icon="folder"
          onPress={() => {}}
        />
        <IconButton
          icon="folder"
          onPress={() => {}}
        /> */}
        <IconButton
          icon="chevron-down"
          onPress={handleExpandClick}
          expanded={expanded}
          style={[styles.iconButton , arrow ]}          
                />
      </Card.Actions>
      <Card.Content>
        {expanded ? (
          <View>
            <Text style={styles.subheader}>الموضوع:</Text>
            <Text style={styles.content}>
            لكن، في الكثير من الحالات لا يكون السبب الرئيسي في ارتفاع ضغط الدم واضحًا، فمن الممكن أن يعود ارتفاع ضغط الدم إلى مجموعة من عوامل الخطر. نقصر نقاشنا في هذا المقال حول الأمراض التي تسبب ارتفاع ضغط الدم، وبعض الأدوية التي يمكن أن تسبب ارتفاع الضغط أيضًا.
            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
            {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>انقطاع التنفس أثناء النوم
</Text>
             {"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.
{"\n"}
<Text style={{fontWeight:'bold' , fontSize: 20}}>السكري</Text>
{"\n"}
يعد السكري من أهم الأمراض التي تسبب ارتفاع ضغط الدم بنسبة كبيرة، حيث تؤدي الإصابة بالسكري أو ارتفاع نسبة السكر في الدم بصورة غير مسيطر عليها إلى التأثير على الأوعية الدموية، مما ينتج عنه تلف تلك الأوعية.


            </Text>
            <Text style={styles.content}>
            <Text style={{fontWeight:'bold' , fontSize: 20}}>  التهاب كبيبات الكلى</Text> 
            {"\n"}   
يعبر التهاب كبيبات الكلى (بالإنجليزية: Glomerulonephritis) عن التهاب الأوعية الدموية الصغيرة في الكلى، مما يصعب من عملية التخلص من الفضلات والسوائل الزائدة في الجسم بشكل جيد، كما ينتج عن التهاب الكبيبات ارتفاع في ضغط الدم. يعود ذلك للأسباب التالية: [4]

تستقبل الكلى حوالي 25 من الدم من القلب مباشرة، مما يعكس العلاقة الوطيدة بين القلب والكلى، لذا فإن أي تغيرات تصيب القلب والأوعية الدموية، أو اضطرابات ضغط الدم يمكن أن تؤثر مباشرة على الكلى، كما يعد تضيق الشريان الكلوي سببًا رئيسيًا لارتفاع ضغط الدم الكلوي والثانوي، لذلك يجب الانتباه إلى علاج فرط ضغط الدم عند علاج التهاب كبيبات الكلى الحاد والمزمن، والفشل الكلوي، والمتلازمة الكلوية.
يعاني مرضى السكري من ارتفاع نسبة السكر في الدم، ينتج عن ذلك زيادة معدلات تدفق الدم إلى الكلى وزيادة الضغط على عملية الترشيح، لتظهر المضاعفات في الكلى والتهاب الكبيبات وبالتالي ارتفاع ضغط الدم.

{"\n"}

          
            </Text>
            <Text style={styles.content}>
         
            </Text>
          </View>
        ):(
            <View>
      </View>
        )}
      </Card.Content>
    </Card>
    </ScrollView>
   
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
  },
  subheader: {
    fontWeight: 'bold',
    marginVertical: 8,
  },
  content: {
    marginVertical: 8,
  },
  iconButton: {
    marginLeft: 'auto',
  },
  expandedButton: {
    transform: [{ rotate: '180deg' }],
    // define a default value for the backgroundColor property
    backgroundColor: 'transparent',
  },
  expandedButton2: {
    transform: [{ rotate: '360deg' }],
    // define a default value for the backgroundColor property
    backgroundColor: 'transparent',
  },
});

export default Articels;