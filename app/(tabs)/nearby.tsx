91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
import React from "react";
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No medical facilities found. Try adjusting your search or filters.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

interface FilterButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterButton = ({ title, isSelected, onPress }: FilterButtonProps) => (
  <View style={styles.filterButtonContainer}>
    <Text
      style={[
        styles.filterButton,
        isSelected && styles.filterButtonSelected,
      ]}
      onPress={onPress}
    >
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
    backgroundColor: Colors.background,
  },
  filtersContainer: {
    marginBottom: theme.spacing.md,
  },
  filtersLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "500",
    color: Colors.gray[600],
    marginBottom: theme.spacing.xs,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterButtonContainer: {
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  filterButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    fontSize: theme.typography.fontSize.sm,
    color: Colors.gray[700],
    overflow: "hidden",
    ...theme.shadows.small,
  },
  filterButtonSelected: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  emptyContainer: {
    padding: theme.spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: theme.typography.fontSize.md,
    color: Colors.gray[600],
    textAlign: "center",
  },
});