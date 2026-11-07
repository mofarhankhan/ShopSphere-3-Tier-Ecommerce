output "app_security_group_id" {
  value = aws_security_group.app.id
}

output "jenkins_security_group_id" {
  value = aws_security_group.jenkins.id
}

output "k3s_security_group_id" {
  value = aws_security_group.k3s.id
}
